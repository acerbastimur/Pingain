import * as React from 'react';
import {
  View, Text, ActivityIndicator, Animated,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from 'react-native-modal';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import QrReadStyle from './QrRead.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import ReadUserQr from '../../../../services/company/General/ReadUserQr.service';
import GivePrize from './WinPin';
import CompanyStore from '../../../../stores/Company.store';
import { Campaign } from '../../../../schemes/company/CompanyCampaign';
import NoCampaign from '../../NoCampaign';

export interface QrReadProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface QrReadState {
  shouldQrReaderActive: boolean;
  loading: boolean;
  isGivePrizeModalOpen: boolean;
  currentCampaign: Campaign;
}

@observer
export default class QrRead extends React.Component<QrReadProps, QrReadState> {
  style = QrReadStyle;

  scanner: QRCodeScanner = null;

  lastQrValue = null;

  errorAnimationValue = new Animated.Value(0);

  constructor(props: QrReadProps) {
    super(props);
    this.state = {
      shouldQrReaderActive: false,
      loading: false,
      isGivePrizeModalOpen: false,
      currentCampaign: null,
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

  errorAnimation = (): Animated.CompositeAnimation => Animated.sequence([
    Animated.timing(
      // Uses easing functions
      this.errorAnimationValue, // The value to drive
      { toValue: 1 }, // Configuration
    ),
    Animated.timing(
      // Uses easing functions
      this.errorAnimationValue, // The value to drive
      { toValue: 0 }, // Configuration
    ),
  ]);

  sendPinRequest = ({ userId, campaignId, qrCode }): Promise<number> => new Promise((resolve, reject) => {
    if (!userId || !campaignId || !qrCode) {
      // error on fields
      this.setState({ loading: false });
      return this.errorAnimation().start();
    }
    // no error on fields
    ReadUserQr.readUserQrService(userId, campaignId, qrCode)
      .then((result) => {
        const currentCampaign = CompanyStore.campaigns.find(
          (campaign) => campaign.campaignId === campaignId,
        );

        this.setState({ currentCampaign });
        return resolve(result);
      })
      .catch((error) => reject(error));
    return null;
  });

  onSuccess = ({ data }) => {
    const { isGivePrizeModalOpen } = this.state;
    if (isGivePrizeModalOpen) return null;
    if (data === this.lastQrValue) return this.errorAnimation().start(); // if still reading the same qr
    this.lastQrValue = data;
    let readQr = null;
    try {
      readQr = JSON.parse(data);
    } catch (error) {
      return this.errorAnimation().start();
    }
    this.setState({ loading: true });
    return this.sendPinRequest({
      userId: readQr?.userId,
      campaignId: readQr?.campaignId,
      qrCode: readQr?.scannedQrId,
    })
      .then(async (responseCode) => {
        if (responseCode === 400 || responseCode === 404) {
          this.setState({ loading: false });
          return this.errorAnimation().start();
        }
        return this.setState({ loading: false, isGivePrizeModalOpen: true });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  public render() {
    const { navigation } = this.props;
    const campaigns = toJS(CompanyStore.campaigns);

    const {
      shouldQrReaderActive, loading, isGivePrizeModalOpen, currentCampaign,
    } = this.state;

    const interpolateColor = this.errorAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(204,204,204)', 'rgb(255, 87, 87)'],
    });


    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={this.style.container}>
        <Modal
          isVisible={isGivePrizeModalOpen}
          swipeDirection={['down']}
          hardwareAccelerated
          swipeThreshold={200}
          hasBackdrop
          propagateSwipe
          backdropOpacity={0.1}
          animationOut="slideOutDown"
          animationOutTiming={350}
          animationInTiming={450}
          onBackdropPress={() => {
            this.setState({ isGivePrizeModalOpen: false });
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: 0,
          }}
          onSwipeComplete={() => {
            this.setState({ isGivePrizeModalOpen: false });
          }}
        >
          {currentCampaign ? (
            <GivePrize
              companyLogo={CompanyStore.companyLogo}
              companyName={CompanyStore.companyDetails.companyName}
              campaignName={currentCampaign.campaignName}
              campaignType={currentCampaign.campaignType}
            />
          ) : (
            <Text>Error</Text>
          )}
        </Modal>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
            }}
          />
        </View>
        {
        campaigns.length === 0
          ? <NoCampaign navigation={navigation} />
          : (
            <View style={this.style.cameraContainer}>
              {shouldQrReaderActive && (
              <QRCodeScanner
                ref={(node) => {
                  this.scanner = node;
                }}
                cameraStyle={this.style.cameraStyle}
                onRead={this.onSuccess}
                fadeIn
                reactivate
                vibrate={false}
                bottomContent={(
                  <View style={this.style.bottomContentContainer}>
                    <View style={this.style.bottomContentBackground} />
                    <Text style={this.style.bottomContentText}>
                      Qr kodu okutarak ödülü verebilirsiniz
                    </Text>
                  </View>
              )}
                bottomViewStyle={this.style.bottomViewStyle}
              />
              )}
              <Animated.View style={[this.style.cameraCenterArea, { borderColor: interpolateColor }]} />
            </View>
          )
}
      </View>
    );
  }
}
