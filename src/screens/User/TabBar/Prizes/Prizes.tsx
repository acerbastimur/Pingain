/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Button, Text, FlatList, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import PrizesStyle from './Prizes.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyCard from '../../../../common-components/CompanyCard';
import CampaignDetailsModalStore from '../../../../stores/CampaignDetailsModal.store';
import GeneralStore from '../../../../stores/General.store';

import Colors from '../../../../styles/Colors';
import CampaignDetails from '../../../../common-components/CampaignDetails';
import ShareUs from '../../ShareUs/ShareUs';

export interface PrizesProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class Prizes extends React.Component<PrizesProps, any> {
  style = PrizesStyle;

  constructor(props: PrizesProps) {
    super(props);
    this.state = {};
  }

  flatListTextHeader = () => {
    return (
      <View style={this.style.flatListHeader}>
        <Text style={this.style.flatListHeaderTextLight}>Pinlerin topladıkça gelen,</Text>
        <Text numberOfLines={1} style={this.style.flatListHeaderTextBold}>
          Ödüller ve İkramlar 🎁
        </Text>
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
          />
        </View>
        <View style={this.style.bottomAreaContainer}>
          <FlatList
            keyboardDismissMode="on-drag"
            ListHeaderComponent={this.flatListTextHeader}
            keyExtractor={(item, index) => index.toString()}
            data={[{isCampaign1Done: true}, {isCampaign1Done: true}]}
            renderItem={({item}) => (
              <CompanyCard navigation={navigation} isCampaign1Done={item.isCampaign1Done} />
            )}
          />
        </View>
        <RBSheet
          ref={ref => {
            GeneralStore.shareUsModalRef = ref;
          }}
          duration={50}
          closeOnDragDown
          animationType="none"
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.3)'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
              shadowOffset: {width: 0, height: 2},
              shadowColor: '#000',
              shadowOpacity: 0.2,
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <ShareUs navigation={navigation} />
        </RBSheet>
        <RBSheet
          ref={ref => {
            CampaignDetailsModalStore.campaignDetailsHalfModalRef = ref;
          }}
          duration={50}
          closeOnDragDown
          animationType="none"
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.3)'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
              shadowOffset: {width: 0, height: 2},
              shadowColor: '#000',
              shadowOpacity: 0.2,
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <CampaignDetails navigation={navigation} />
        </RBSheet>
      </View>
    );
  }
}
