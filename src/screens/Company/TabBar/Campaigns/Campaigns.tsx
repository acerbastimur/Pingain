/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
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

  public render() {
    const {navigation} = this.props;

    return <Text>Company Campaign</Text>;
  }
}
