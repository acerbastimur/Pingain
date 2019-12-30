/* eslint-disable react-native/no-color-literals */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-wrap-multilines */
import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QrReadStyle from './QrRead.style';
import TabsHeader from '../../../../common-components/TabsHeader';

export interface QrReadProps {}

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
    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader />
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
