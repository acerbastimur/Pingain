/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-wrap-multilines */
import * as React from 'react';
import {View, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import QrReadStyle from './QrRead.style';
import TabsHeader from '../../../../common-components/TabsHeader';

export interface QrReadProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface QrReadState {
  shouldQrReaderActive: boolean;
}

export default class QrRead extends React.Component<QrReadProps, QrReadState> {
  style = QrReadStyle;

  scanner: QRCodeScanner = null;

  constructor(props: QrReadProps) {
    super(props);
    this.state = {shouldQrReaderActive: false};
  }

  componentDidMount() {
    const {navigation} = this.props;

    navigation.addListener('willFocus', () => {
      this.setState({shouldQrReaderActive: true});
    });
    navigation.addListener('willBlur', () => {
      this.setState({shouldQrReaderActive: false});
    });
  }

  onSuccess = () => {
    // alert(e.data);
    this.scanner.reactivate();
  };

  public render() {
    const {navigation} = this.props;
    const {shouldQrReaderActive} = this.state;

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
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
