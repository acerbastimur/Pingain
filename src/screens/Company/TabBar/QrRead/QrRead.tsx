import * as React from 'react';
import { View, Text, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import FastImage from 'react-native-fast-image';
import QrReadStyle from './QrRead.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import ReadUserQr from '../../../../services/company/General/ReadUserQr.service';
import GivePrize from './GivePrize';
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

  errorAnimation = (): Animated.CompositeAnimation =>
    Animated.sequence([
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

  sendPinRequest = ({ userId, campaignId, qrCode }): Promise<number> =>
    new Promise((resolve, reject) => {
      if (!userId || !campaignId || !qrCode) {
        // error on fields
        this.setState({ loading: false });
        return this.errorAnimation().start();
      }
      // no error on fields
      ReadUserQr.readUserQrService(userId, campaignId, qrCode)
        .then(result => {
          const currentCampaign = CompanyStore.campaigns.find(
            campaign => campaign.campaignId === campaignId,
          );

          this.setState({ currentCampaign });
          return resolve(result);
        })
        .catch(error => reject(error));
      return null;
    });

  onSuccess = ({ data }) => {
    const { isGivePrizeModalOpen } = this.state;
    const { navigation } = this.props;

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
      .then(async responseCode => {
        if (responseCode === 400 || responseCode === 404) {
          this.setState({ loading: false });
          return this.errorAnimation().start();
        }
        navigation.navigate('Home');
        return setTimeout(() => {
          this.setState({ loading: false, isGivePrizeModalOpen: true });
        }, 200);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  public render() {
    const { navigation } = this.props;
    const campaigns = toJS(CompanyStore.campaigns);

    const { shouldQrReaderActive, loading, isGivePrizeModalOpen, currentCampaign } = this.state;

    const interpolateColor = this.errorAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(204,204,204)', 'rgb(255, 87, 87)'],
    });

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 100, height: 100 }}
          source={require('../../../../assets/image/loading.gif')}
        />
      </View>
    ) : (
      <View style={this.style.container}>
        <Modal
          isVisible={isGivePrizeModalOpen}
          swipeDirection={['down']}
          hardwareAccelerated
          swipeThreshold={200}
          hasBackdrop
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
        {!campaigns ? (
          <NoCampaign navigation={navigation} />
        ) : (
          <View style={this.style.cameraContainer}>
            {shouldQrReaderActive && (
              <View style={this.style.cameraWrapper}>
                <RNCamera
                  style={this.style.cameraStyle}
                  type={RNCamera.Constants.Type.back}
                  captureAudio={false}
                  onBarCodeRead={this.onSuccess}
                  flashMode={RNCamera.Constants.FlashMode.off}
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                />
              </View>
            )}
            <Animated.View
              style={[this.style.cameraCenterArea, { borderColor: interpolateColor }]}
            />
            <View style={this.style.bottomViewStyle}>
              <View style={this.style.bottomContentContainer}>
                <View style={this.style.bottomContentBackground} />
                <Text style={this.style.bottomContentText}>
                  QR kodu okutarak pini kazanabilirsin.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
