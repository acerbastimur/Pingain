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
import WinPrize from './WinPrize';

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
            WinModalStore.getPinModalRef = ref;
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
            onPress={() => {
              navigation.navigate('UserDetails');
            }}
          />
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
