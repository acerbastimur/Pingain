/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-wrap-multilines */
import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth';
import {toJS} from 'mobx';
import QrReadStyle from './QrRead.style';
import Colors from '../../../../styles/Colors';
import TabsHeader from '../../../../common-components/TabsHeader';
import WinPin from './WinPin';
import WinModalStore from '../../../../stores/WinModal.store';
import WinPrize from './WinPrize';
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
    const {navigation} = this.props;
    navigation.addListener('willFocus', route => {
      this.setState({shouldQrReaderActive: true});
    });
    navigation.addListener('willBlur', route => {
      this.setState({shouldQrReaderActive: false});
    });
  }

  sendPinRequest = ({companyId, campaignId, qrCode}): Promise<number> => {
    return new Promise((resolve, reject) => {
      const {uid} = auth().currentUser;

      console.log(uid, campaignId, qrCode);

      if (!companyId || !campaignId || !qrCode) return; // error on fields

      ReadCampaignQr.readCampaignQr(uid, companyId, campaignId, qrCode)
        .then(result => {
          console.log(result);
          resolve(result);
        })
        .catch(error => {
          console.warn(error);
          reject(error);
        });
    });
  };

  onSuccess = ({data}) => {
    if (data === this.lastQrValue) return; // if still reading the same qr
    this.lastQrValue = data;
    let readQr = null;
    try {
      readQr = JSON.parse(data);
      console.log(readQr);
    } catch (error) {
      console.log(error);
      return;
    }
    this.setState({loading: true});
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
          console.log('302');

          this.setState({loading: false});
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
          };
          console.warn(WinModalStore.winPrizeDetails);

          WinModalStore.winPrizeHalfModalRef.open();
          return;
        }

        // if user's got a pin
        await GetUserInfoService.getUserInfo(); // update store

        this.setState({loading: false});
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
          };
          console.warn(WinModalStore.winPrizeDetails);

          WinModalStore.winPrizeHalfModalRef.open();
          return;
        }

        WinModalStore.getPinDetails = {
          campaignType: scannedCampaign.campaignType,
          companyLogo: scannedCompany.companyLogo,
          companyName: scannedCompany.companyName,
          campaignName: scannedCampaign.campaignName,
        };
        WinModalStore.getPinModalRef.open();
      })
      .catch(() => {
        console.log('error');

        this.setState({loading: false});
      });
  };

  public render() {
    const {navigation} = this.props;
    const {shouldQrReaderActive, loading} = this.state;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.container}>
        <RBSheet
          ref={ref => {
            WinModalStore.getPinModalRef = ref;
          }}
          duration={250}
          closeOnDragDown
          animationType="slide"
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.3)'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
              shadowOffset: {width: 0, height: 2},
              shadowColor: '#000',
              shadowOpacity: 0.2,
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <WinPin navigation={navigation} />
        </RBSheet>
        <RBSheet
          ref={ref => {
            WinModalStore.winPrizeHalfModalRef = ref;
          }}
          duration={50}
          closeOnDragDown
          animationType="none"
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.3)'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
              shadowOffset: {width: 0, height: 2},
              shadowColor: '#000',
              shadowOpacity: 0.2,
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <WinPrize navigation={navigation} />
        </RBSheet>
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
