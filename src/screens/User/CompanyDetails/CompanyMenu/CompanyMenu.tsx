import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';

import { observer } from 'mobx-react';
import CompanyMenuStyle from './CompanyMenu.style';
import TabsHeader from '../../../../common-components/TabsHeader';

import UserStore from '../../../../stores/User.store';
import { toJS } from 'mobx';
import MenuCard from './MenuCard';
import { UserCompany } from '../../../../schemes/user/UserCompany';

export interface CompanyMenuProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class CompanyMenu extends React.Component<CompanyMenuProps> {
  style = CompanyMenuStyle;

  constructor(props: CompanyMenuProps) {
    super(props);
    this.state = {};
  }

  flatListTextHeader = () => {
    return (
      <View style={this.style.flatListHeader}>
        <Text style={this.style.flatListHeaderTextLight}>Afiyet Olsun Pingainer,</Text>
        <Text numberOfLines={1} style={this.style.flatListHeaderTextBold}>
          Menümüz
        </Text>
      </View>
    );
  };

  public render() {
    const { navigation } = this.props;
    const {
      companyMenu: { sections },
    }: UserCompany = this.props.navigation.getParam('company');
    console.log(toJS(sections));

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('UserDetails');
            }}
            onLeftPress={() => null}
          />
        </View>
        <View style={this.style.bottomAreaContainer}>
          <FlatList
            keyboardDismissMode="on-drag"
            ListHeaderComponent={this.flatListTextHeader}
            keyExtractor={(item, index) => index.toString()}
            data={sections}
            renderItem={({ item }) => <MenuCard navigation={navigation} section={item} />}
          />
        </View>
      </View>
    );
  }
}
