/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';

import {observer} from 'mobx-react';
import NoCampaignStyle from './NoCampaign.style';
import Button from '../../../../../common-components/Button';
import Colors from '../../../../../styles/Colors';

export interface NoCampaignProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class NoCampaign extends React.Component<NoCampaignProps, any> {
  style = NoCampaignStyle;

  constructor(props: NoCampaignProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;

    return (
      <View style={this.style.container}>
        <Text style={this.style.headerText}>Hiç kampanyan yok</Text>
        <Text style={this.style.topTextLight}>
          Pingain Ailesine Hoşgeldin! {'\n'}
          Henüz hiçbir kampanyaya katılmadın. Hemen bir işletmenin kampanyasına katıl,
          <Text style={this.style.textHighlighted}> bedava ürününü</Text> Pingain ile kazan!
        </Text>
        <View style={this.style.imageContainer}>
          <Image
            style={this.style.image}
            source={require('../../../../../assets/image/Company/NoCampaignImage.png')}
          />
        </View>
      </View>
    );
  }
}
