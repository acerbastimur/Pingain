/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import RBSheet from 'react-native-raw-bottom-sheet';

import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import PrizesStyle from './Prizes.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import CompanyCard from '../../CompanyCard';
import CampaignDetailsModalStore from '../../../../stores/CampaignDetailsModal.store';
import GeneralStore from '../../../../stores/General.store';

import Colors from '../../../../styles/Colors';
import CampaignDetails from '../../CampaignDetails';
import ShareUs from '../../ShareUs/ShareUs';
import WinPrize from '../QrRead/WinPrize';
import WinModalStore from '../../../../stores/WinModal.store';
import UserStore from '../../../../stores/User.store';
import NoCampaign from './NoCampaign';

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
    // eslint-disable-next-line prefer-destructuring
    const companies = toJS(UserStore.companies);
    const activeCampaigns = toJS(UserStore.userDetails.activeCampaigns);

    // get user's active campaigns
    const companiesWithEarnedCampaigns = companies
      .map(company => {
        const newCampaignList = company.campaigns.filter(campaign => {
          return (
            activeCampaigns &&
            activeCampaigns.find(
              activeCampaign => activeCampaign.campaignId === campaign.campaignId,
            )
          );
        });
        if (newCampaignList.length === 0) return null; // if there is no campaign on company
        return {
          address: company.address,
          campaigns: newCampaignList,
          city: company.city,
          companyFeatures: company.companyFeatures,
          companyImages: company.companyImages,
          companyLogo: company.companyLogo,
          companyName: company.companyName,
          instagramAccount: company.instagramAccount,
          phoneNumber: company.phoneNumber,
        };
      })
      .filter(e => e);
    // count for campaigns
    let campaignCount = 0;
    companiesWithEarnedCampaigns.forEach(company => {
      company.campaigns.forEach(() => {
        campaignCount += 1;
      });
    });

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
          {campaignCount === 0 ? (
            <NoCampaign navigation={navigation} />
          ) : (
            <FlatList
              keyboardDismissMode="on-drag"
              ListHeaderComponent={this.flatListTextHeader}
              keyExtractor={(item, index) => index.toString()}
              data={companiesWithEarnedCampaigns}
              renderItem={({item}) => <CompanyCard navigation={navigation} company={item} />}
            />
          )}
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
        <RBSheet
          ref={ref => {
            WinModalStore.winPrizeHalfModalRef = ref;
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
          <WinPrize navigation={navigation} />
        </RBSheet>
      </View>
    );
  }
}
