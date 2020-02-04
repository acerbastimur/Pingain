/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-wrap-multilines */
import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import auth from '@react-native-firebase/auth';
import QrReadStyle from './QrRead.style';
import Colors from '../../../../styles/Colors';
import TabsHeader from '../../../../common-components/TabsHeader';
import WinPin from './WinPin';
import WinModalStore from '../../../../stores/WinModal.store';
import WinPrize from './WinPrize';
import ReadCampaignQr from '../../../../services/user/General/ReadCampaignQr.service';

export interface QrReadProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface QrReadState {
  shouldQrReaderActive: boolean;
}

export default class QrRead extends React.Component<QrReadProps, QrReadState> {
  style = QrReadStyle;

  scanner: QRCodeScanner = null;

  lastQrValue = null;

  getPinModal: RBSheet = null;

  constructor(props: QrReadProps) {
    super(props);
    this.state = {
      shouldQrReaderActive: false,
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

  sendPinRequest = async ({companyId, campaignId, qrCode}) => {
    const {uid} = auth().currentUser;

    console.log(uid, campaignId, qrCode);

    if (!companyId || !campaignId || !qrCode) return; // error on fields

    ReadCampaignQr.readCampaignQr(uid, companyId, campaignId, qrCode)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        this.getPinModal.open();
        console.warn(error);
      });
  };

  onSuccess = ({data}) => {
    if (data === this.lastQrValue) return; // if still reading the same qr
    this.lastQrValue = data;
    let readQr = null;
    try {
      readQr = JSON.parse(data);
    } catch (error) {
      console.log(error);
      return;
    }
    this.sendPinRequest({
      campaignId: readQr?.campaignId,
      companyId: readQr?.companyId,
      qrCode: readQr?.qrCode,
    });
  };

  public render() {
    const {navigation} = this.props;
    const {shouldQrReaderActive} = this.state;

    return (
      <View style={this.style.container}>
        <RBSheet
          ref={ref => {
            this.getPinModal = ref;
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
          <View style={this.style.cameraCenterArea} />
        </View>
      </View>
    );
  }
}
