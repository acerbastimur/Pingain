import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';

import { observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import NoCampaignStyle from './NoCampaign.style';

export interface NoCampaignProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class NoCampaign extends React.Component<NoCampaignProps> {
  style = NoCampaignStyle;

  constructor(props: NoCampaignProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View style={this.style.container}>
        <Text style={this.style.headerText}>Hiç kampanyan yok</Text>
        <Text style={this.style.topTextLight}>
          Pingain Ailesine Hoşgeldin! {'\n'}
          Henüz hiçbir kampanyaya katılmadın. Hemen bir işletmenin kampanyasına katıl,
          <Text style={this.style.textHighlighted}> bedava ürününü</Text> Pingain ile kazan!
        </Text>
        <View style={this.style.imageContainer}>
          <FastImage
            resizeMode="contain"
            style={this.style.image}
            source={require('../../../../../assets/image/Company/NoCampaignImage.png')}
          />
        </View>
      </View>
    );
  }
}
