/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState, FlatList} from 'react-navigation';
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
      this.setState({transactions});
    });
  }

  renderUser = (name: string, surname: string, transactionDate: Date) => {
    const getDay =
      new Date(transactionDate).getDay().toString().length === 1
        ? `0${new Date(transactionDate).getDay().toString()}`
        : new Date(transactionDate).getDay().toString();
    const getMonth =
      new Date(transactionDate).getMonth().toString().length === 1
        ? `0${new Date(transactionDate).getMonth().toString()}`
        : new Date(transactionDate).getMonth().toString();

    const getYear = new Date(transactionDate)
      .getFullYear()
      .toString()
      .slice(-2);
    const getHours =
      new Date(transactionDate).getHours().toString().length === 1
        ? `0${new Date(transactionDate).getHours().toString()}`
        : new Date(transactionDate).getHours().toString();

    const getMinutes =
      new Date(transactionDate).getMinutes().toString().length === 1
        ? `0${new Date(transactionDate).getMinutes().toString()}`
        : new Date(transactionDate).getMinutes().toString();

    return (
      <View style={this.style.userContainer}>
        <Text style={this.style.userName}>{`${name} ${surname}`}</Text>
        <Text style={this.style.date}>{`${getDay}.${getMonth}.${getYear}`}</Text>
        <Text style={this.style.time}>{`${getHours}.${getMinutes}`}</Text>
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
              data={transactions.sort(
                (transactionFirst, transactionLast) =>
                  new Date(transactionLast.transactionDate).getTime() -
                  new Date(transactionFirst.transactionDate).getTime(),
              )}
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
