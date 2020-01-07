/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Button, Text, FlatList, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import CampaignsStyle from './Campaigns.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyCard from '../../../../common-components/CompanyCard';
import CampaignDetailsModalStore from '../../../../stores/CampaignDetailsModal.store';

import Colors from '../../../../styles/Colors';
import CampaignDetails from '../../../../common-components/CampaignDetails';

export interface CampaignsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

@observer
export default class Campaigns extends React.Component<CampaignsProps, any> {
  style = CampaignsStyle;

  constructor(props: CampaignsProps) {
    super(props);
    this.state = {};
  }

  flatListTextHeader = () => {
    return (
      <View style={this.style.flatListHeader}>
        <Text style={this.style.flatListHeaderTextLight}>Hoşgeldin Pingainer</Text>
        <Text numberOfLines={1} style={this.style.flatListHeaderTextBold}>
          Öne Çıkan Kampanyalar
        </Text>
      </View>
    );
  };

  public render() {
    const {navigation} = this.props;

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader navigation={navigation} />
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
            CampaignDetailsModalStore.campaignDetailsHalfModalRef = ref;
          }}
          duration={50}
          closeOnDragDown
          animationType="slide"
          customStyles={{
            wrapper: {backgroundColor: 'transparent'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <CampaignDetails navigation={navigation} />
        </RBSheet>
      </View>
    );
  }
}
