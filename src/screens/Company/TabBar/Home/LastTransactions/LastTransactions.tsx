/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Image, Text} from 'react-native';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
  FlatList,
} from 'react-navigation';
import {Card} from 'react-native-shadow-cards';
import LastTransactionsStyle from './LastTransactions.style';
import TabsHeader from '../../../../../common-components/TabsHeader';

export interface LastTransactionsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class LastTransactions extends React.Component<LastTransactionsProps, any> {
  style = LastTransactionsStyle;

  constructor(props: LastTransactionsProps) {
    super(props);
    this.state = {};
  }

  renderUser = () => {
    return (
      <View style={this.style.userContainer}>
        <Image
          style={this.style.profilePhoto}
          source={require('../../../../../assets/image/User/profileImage.png')}
        />
        <Text style={this.style.userName}>Samet Özkale</Text>
        <Text style={this.style.date}>07.09.19</Text>
        <Text style={this.style.time}>09.03</Text>
      </View>
    );
  };

  public render() {
    const {navigation} = this.props;

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('UserDetails');
            }}
            onLeftPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
        <View style={this.style.pageHeader}>
          <View>
            <Text style={this.style.pageHeaderTextLight}>İşletmeni İleriye Taşıyacak</Text>
            <Text numberOfLines={1} style={this.style.pageHeaderTextBold}>
              Son İşlem Yapanlar
            </Text>
          </View>
        </View>
        <View style={this.style.bottomArea}>
          <View style={this.style.listHeader}>
            <Text style={[this.style.listHeaderText, this.style.headerUserName]}>
              Kullanıcı Adı
            </Text>
            <Text style={[this.style.listHeaderText, this.style.headerDate]}>Tarih</Text>
            <Text style={[this.style.listHeaderText, this.style.headerTime]}>Saat</Text>
          </View>
          <FlatList
            style={this.style.usersContainer}
            data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderUser}
          />
        </View>
      </View>
    );
  }
}
