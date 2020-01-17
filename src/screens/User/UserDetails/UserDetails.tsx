/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import {Card} from 'react-native-shadow-cards';
import UserDetailsStyle from './UserDetails.style';
import TabsHeader from '../../../common-components/TabsHeader';
import CompanyCard from '../../../common-components/CompanyCard';
import WinModalStore from '../../../stores/WinModal.store';

interface UserDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class UserDetails extends React.Component<UserDetailsProps> {
  style = UserDetailsStyle;

  references = [];

  constructor(props: UserDetailsProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  public render() {
    const {navigation} = this.props;
    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            rightEditIcon
            navigation={navigation}
            onRightPress={() => {
              console.log('done');
              navigation.navigate('UserDetailsEdit');
            }}
            onLeftPress={() => null}
          />
        </View>
        <ScrollView contentContainerStyle={this.style.scrollContainerStyle}>
          <View style={this.style.profileInfoContainer}>
            <View style={this.style.ppOverflow}>
              <Image
                source={require('../../../assets/image/User/profileImage.png')}
                style={this.style.profileImage}
              />
            </View>

            <Text style={this.style.nameText}>Samet Özkale</Text>
          </View>
          <View style={this.style.cardsContainer}>
            <Card elevation={6} opacity={0.1} style={[this.style.card, this.style.winCard]}>
              <Text style={this.style.cardText}>Kazandığın Pin Sayısı</Text>
              <View style={this.style.cardRight}>
                <Text style={[this.style.cardText, this.style.textRight]}>82</Text>
              </View>
            </Card>
            <Card elevation={6} opacity={0.1} style={this.style.card}>
              <Text style={this.style.cardText}>Kazandığın Ödül Sayısı</Text>
              <View style={this.style.cardRight}>
                <Text style={[this.style.cardText, this.style.textRight]}>5</Text>
              </View>
            </Card>
          </View>
          <Text style={this.style.activeCampText}>Aktif Kampanyaların</Text>
          <View>
            <CompanyCard navigation={navigation} isCampaign1Done />
          </View>
        </ScrollView>
      </View>
    );
  }
}
