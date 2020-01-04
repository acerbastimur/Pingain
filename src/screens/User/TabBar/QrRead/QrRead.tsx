/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-wrap-multilines */
import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';
import QrReadStyle from './QrRead.style';
import Colors from '../../../../styles/Colors';
import TabsHeader from '../../../../common-components/TabsHeader';
import WinPin from './WinPin';
import WinModalStore from '../../../../stores/WinModal.store';

export interface QrReadProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface QrReadState {}

export default class QrRead extends React.Component<QrReadProps, QrReadState> {
  style = QrReadStyle;

  scanner: QRCodeScanner = null;

  constructor(props: QrReadProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.scanner.reactivate();
    setTimeout(() => {
      WinModalStore.winHalfModalRef.open();
    }, 1000);
  }

  onSuccess = e => {
    alert(e.data);
    this.scanner.reactivate();
  };

  public render() {
    const {navigation} = this.props;
    return (
      <View style={this.style.container}>
        <RBSheet
          ref={ref => {
            WinModalStore.winHalfModalRef = ref;
          }}
          duration={50}
          closeOnDragDown
          animationType="slide"
          customStyles={{
            wrapper: {backgroundColor: 'rgba(250,250,250,0.4)'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <WinPin navigation={navigation} />
        </RBSheet>
        <View style={this.style.headerContainer}>
          <TabsHeader navigation={navigation} />
        </View>
        <View style={this.style.cameraContainer}>
          <QRCodeScanner
            ref={node => {
              this.scanner = node;
            }}
            cameraStyle={this.style.cameraStyle}
            onRead={this.onSuccess}
            fadeIn
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
          <View style={this.style.cameraCenterArea} />
        </View>
      </View>
    );
  }
}
