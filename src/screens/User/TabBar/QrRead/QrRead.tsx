import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import QrReadStyle from './QrRead.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import WinPin from './WinPin';
import WinModalStore from '../../../../stores/WinModal.store';
import ReadCampaignQr from '../../../../services/user/General/ReadCampaignQr.service';
import UserStore from '../../../../stores/User.store';
import GetUserInfoService from '../../../../services/user/General/GetUserInfo.service';

export interface QrReadProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface QrReadState {
  shouldQrReaderActive: boolean;
  loading: boolean;
}

@observer
export default class QrRead extends React.Component<QrReadProps, QrReadState> {
  style = QrReadStyle;

  scanner: QRCodeScanner = null;

  lastQrValue = null;

  constructor(props: QrReadProps) {
    super(props);
    this.state = {
      shouldQrReaderActive: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.setState({ shouldQrReaderActive: true });
    });
    navigation.addListener('willBlur', () => {
      this.setState({ shouldQrReaderActive: false });
    });
  }

  sendPinRequest = ({ companyId, campaignId, qrCode }): Promise<number> =>
    new Promise((resolve, reject) => {
      const { uid } = auth().currentUser;

      if (!companyId || !campaignId || !qrCode) return; // error on fields

      ReadCampaignQr.readCampaignQr(uid, companyId, campaignId, qrCode)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });

  onSuccess = ({ data }) => {
    const { navigation } = this.props;

    if (data === this.lastQrValue) return; // if still reading the same qr
    this.lastQrValue = data;
    let readQr = null;
    try {
      readQr = JSON.parse(data);
    } catch (error) {
      return;
    }
    this.setState({ loading: true });
    this.sendPinRequest({
      campaignId: readQr?.campaignId,
      companyId: readQr?.companyId,
      qrCode: readQr?.scannedQrId,
    })
      .then(async responseCode => {
        // find which company's campaign is scanned
        const scannedCompany = toJS(
          UserStore.companies.find(company => company.companyId === readQr.companyId),
        );
        const scannedCampaign = toJS(
          scannedCompany.campaigns.find(campaign => campaign.campaignId === readQr.campaignId),
        );

        // if user has already won a prize on that campaign
        if (responseCode === 302) {
          this.setState({ loading: false });
          const campaignGiftCode = UserStore.userDetails.activeCampaigns.find(
            campaign => campaign.campaignId === scannedCampaign.campaignId,
          )?.giftCode;

          if (!campaignGiftCode) return; // prevent errors if there is no giftCode

          WinModalStore.winPrizeDetails = {
            campaignType: scannedCampaign.campaignType,
            companyLogo: scannedCompany.companyLogo,
            companyName: scannedCompany.companyName,
            campaignName: scannedCampaign.campaignName,
            giftCode: campaignGiftCode,
            campaignId: scannedCampaign.campaignId,
            company: scannedCompany,
          };

          navigation.navigate('PrizesHome');
          setTimeout(() => {
            WinModalStore.isWinPrizeModalOpened = true;
          }, 200);
          return;
        }

        // if user's got a pin
        await GetUserInfoService.getUserInfo(); // update store

        this.setState({ loading: false });
        // check if user has won a prize at this reading
        const campaignGiftCode = UserStore.userDetails.activeCampaigns.find(
          campaign => campaign.campaignId === scannedCampaign.campaignId,
        )?.giftCode;

        if (campaignGiftCode) {
          WinModalStore.winPrizeDetails = {
            campaignType: scannedCampaign.campaignType,
            companyLogo: scannedCompany.companyLogo,
            companyName: scannedCompany.companyName,
            campaignName: scannedCampaign.campaignName,
            giftCode: campaignGiftCode,
            campaignId: scannedCampaign.campaignId,
            company: scannedCompany,
          };

          navigation.navigate('PrizesHome');
          WinModalStore.isWinPrizeModalOpened = true;

          return;
        }

        WinModalStore.getPinDetails = {
          campaignType: scannedCampaign.campaignType,
          companyLogo: scannedCompany.companyLogo,
          companyName: scannedCompany.companyName,
          campaignName: scannedCampaign.campaignName,
          companyId: scannedCompany.companyId,
        };
        navigation.navigate('CampaignsHome');

        WinModalStore.isGetPinModalOpened = true;
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  public render() {
    const { navigation } = this.props;
    const { shouldQrReaderActive, loading } = this.state;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.container}>
        <Modal
          isVisible={WinModalStore.isGetPinModalOpened}
          swipeDirection={['down']}
          hardwareAccelerated
          swipeThreshold={200}
          hasBackdrop
          backdropOpacity={0.1}
          animationOut="slideOutDown"
          animationOutTiming={350}
          onBackdropPress={() => {
            WinModalStore.isGetPinModalOpened = false;
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: 0,
          }}
          onSwipeComplete={() => {
            WinModalStore.isGetPinModalOpened = false;
          }}
        >
          <WinPin navigation={navigation} />
        </Modal>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('UserDetails');
            }}
          />
        </View>
        <View style={this.style.cameraContainer}>
          {shouldQrReaderActive && (
            <QRCodeScanner
              ref={node => {
                this.scanner = node;
              }}
              cameraStyle={this.style.cameraStyle}
              onRead={this.onSuccess}
              fadeIn
              reactivate
              vibrate={false}
              bottomContent={
                <View style={this.style.bottomContentContainer}>
                  <View style={this.style.bottomContentBackground} />
                  <Text style={this.style.bottomContentText}>
                    QR kodu okutarak pini kazanabilirsin.
                  </Text>
                </View>
              }
              bottomViewStyle={this.style.bottomViewStyle}
            />
          )}
          <View style={[this.style.cameraCenterArea]} />
        </View>
      </View>
    );
  }
}
