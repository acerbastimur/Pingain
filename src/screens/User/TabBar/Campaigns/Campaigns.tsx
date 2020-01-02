import * as React from 'react';
import {View, Button, Text, FlatList, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import CampaignsStyle from './Campaigns.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyCard from './CompanyCard';
import CampaignDetailsStore from '../../../../stores/CampaignDetails.store';

import Colors from '../../../../styles/Colors';
import CampaignDetails from './CampaignDetails';

export interface CampaignsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface CampaignsState {}

@observer
export default class Campaigns extends React.Component<CampaignsProps, CampaignsState> {
  style = CampaignsStyle;

  RBSheet = null;

  constructor(props: CampaignsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.RBSheet.open();
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
            data={[
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ]}
            renderItem={() => <CompanyCard navigation={navigation} />}
          />
        </View>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          duration={250}
          closeOnDragDown
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,0.1)'},
            container: {
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 2,
              height: 'auto',
              paddingBottom: 50,
            },
            draggableIcon: {width: 100, height: 4, backgroundColor: Colors.SECONDARY},
          }}>
          <CampaignDetails navigation={navigation} />
        </RBSheet>
      </View>
    );
  }
}
