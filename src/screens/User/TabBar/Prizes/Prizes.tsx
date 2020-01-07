/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {NavigationScreenProp, NavigationState, NavigationParams} from 'react-navigation';
import PrizesStyle from './Prizes.style';
import TabsHeader from '../../../../common-components/TabsHeader';

export interface PrizesProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Prizes extends React.Component<PrizesProps, any> {
  style = PrizesStyle;

  constructor(props: PrizesProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation} = this.props;
    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader navigation={navigation} />
        </View>
        <View style={this.style.body}>
          <Text style={this.style.topTextLight}>Biz büyüyen bir aileyiz</Text>
          <Text style={this.style.topTextBold}>Bize Destek Ol!</Text>
          <Image
            style={this.style.bodyImage}
            source={require('../../../../assets/image/shareUsImage.png')}
          />
          <Text style={this.style.bottomTextBold}>Takip et - beğen - paylaş</Text>
          <Text style={this.style.bottomTextLight}>
            Instagram hesabımızı <Text style={this.style.textHighlighted}>takip et</Text>.
          </Text>
          <Text style={this.style.bottomTextLight}>
            <Text style={this.style.textHighlighted}>Kampanyalardan</Text> ilk sen haberdar ol,
          </Text>
          <Text style={this.style.bottomTextLight}>
            Yapacağımız <Text style={this.style.textHighlighted}>çekilişleri</Text> sakın kaçırma!
          </Text>
          <TouchableOpacity
            style={this.style.followButton}
            onPress={() => {
              Linking.openURL('instagram://user?username=pingain').catch(err => {
                Linking.openURL('https://instagram.com/pingain');
              });
            }}>
            <Image
              style={this.style.instaIcon}
              source={require('../../../../assets/image/instaIcon.png')}
            />
            <Text style={this.style.buttonText}>Instagram'da Takip Et</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
