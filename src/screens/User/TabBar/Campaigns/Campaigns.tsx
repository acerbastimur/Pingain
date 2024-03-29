import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import Modal from 'react-native-modal';

import { observer } from 'mobx-react';
import messaging from '@react-native-firebase/messaging';
import FastImage from 'react-native-fast-image';
import CampaignsStyle from './Campaigns.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyCard from '../../CompanyCard';
import CampaignDetailsModalStore from '../../../../stores/CampaignDetailsModal.store';
import CampaignDetails from '../../CampaignDetails';
import WinPrize from '../QrRead/WinPrize';
import WinModalStore from '../../../../stores/WinModal.store';
import GetCompaniesService from '../../../../services/user/General/GetCompanies.service';
import UserStore from '../../../../stores/User.store';

export interface CampaignsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface CampaignsState {
  loading: boolean;
}

@observer
export default class Campaigns extends React.Component<CampaignsProps, CampaignsState> {
  style = CampaignsStyle;

  constructor(props: CampaignsProps) {
    super(props);
    this.state = { loading: true };
    GetCompaniesService.getCompanies()
      .then(companies => {
        UserStore.companies = companies.length > 0 ? companies : null;
        this.setState({ loading: false });
        if (!messaging().hasPermission()) messaging().requestPermission();
      })
      .catch(() => {
        UserStore.companies = null;
      });
  }

  flatListTextHeader = () => (
    <View style={this.style.flatListHeader}>
      <Text style={this.style.flatListHeaderTextLight}>Hoşgeldin Pingainer</Text>
      <Text numberOfLines={1} style={this.style.flatListHeaderTextBold}>
        Öne Çıkan Kampanyalar
      </Text>
    </View>
  );

  public render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    const { companies } = UserStore;

    return loading ? (
      <View style={this.style.indicatorContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 100, height: 100 }}
          source={require('../../../../assets/image/loading.gif')}
        />
      </View>
    ) : (
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
            data={companies}
            renderItem={({ item }) => <CompanyCard navigation={navigation} company={item} />}
          />
        </View>

        <Modal
          isVisible={WinModalStore.isWinPrizeModalOpened}
          swipeDirection={['down']}
          hardwareAccelerated
          swipeThreshold={200}
          hasBackdrop
          backdropOpacity={0.1}
          animationOut="slideOutDown"
          animationOutTiming={350}
          onBackdropPress={() => {
            WinModalStore.isWinPrizeModalOpened = false;
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: 0,
          }}
          onSwipeComplete={() => {
            WinModalStore.isWinPrizeModalOpened = false;
          }}
        >
          <WinPrize navigation={navigation} />
        </Modal>
        <Modal
          isVisible={CampaignDetailsModalStore.isCampaignDetailsModalOpen}
          swipeDirection={['down']}
          hardwareAccelerated
          swipeThreshold={50}
          hasBackdrop
          coverScreen
          backdropOpacity={0.1}
          animationOut="slideOutDown"
          animationOutTiming={350}
          onBackdropPress={() => {
            CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            margin: 0,
          }}
          onSwipeComplete={() => {
            CampaignDetailsModalStore.isCampaignDetailsModalOpen = false;
          }}
        >
          <CampaignDetails navigation={navigation} />
        </Modal>
      </View>
    );
  }
}
