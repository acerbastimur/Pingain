/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState, FlatList} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import LastTransactionsStyle from './LastTransactions.style';
import TabsHeader from '../../../../../common-components/TabsHeader';
import GetLastTransactionsService from '../../../../../services/company/General/GetLastTransactions.service';
import LastTransaction from '../../../../../schemes/company/LastTransactions';

export interface LastTransactionsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface LastTransactionsState {
  transactions: Array<LastTransaction>;
}

export default class LastTransactions extends React.Component<
  LastTransactionsProps,
  LastTransactionsState
> {
  style = LastTransactionsStyle;

  constructor(props: LastTransactionsProps) {
    super(props);
    this.state = {transactions: null};
    GetLastTransactionsService.getLastTransactions().then(transactions => {
      console.log(transactions);
      this.setState({transactions});
    });
  }

  renderUser = (name: string, surname: string, transactionDate: Date) => {
    const {getDay, getMonth, getTime} = new Date(transactionDate);
    // console.log(getDay(), getMonth(), getTime());
    return (
      <View style={this.style.userContainer}>
        <FastImage
          resizeMode="contain"
          style={this.style.profilePhoto}
          source={require('../../../../../assets/image/User/profileImage.png')}
        />
        <Text style={this.style.userName}>{name + surname}</Text>
        <Text style={this.style.date}>07.09.19</Text>
        <Text style={this.style.time}>09.03</Text>
      </View>
    );
  };

  public render() {
    const {navigation} = this.props;
    const {transactions} = this.state;

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
          {transactions ? (
            <FlatList
              style={this.style.usersContainer}
              data={transactions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item: {name, surname, transactionDate}}) =>
                this.renderUser(name, surname, transactionDate)
              }
            />
          ) : null}
        </View>
      </View>
    );
  }
}
