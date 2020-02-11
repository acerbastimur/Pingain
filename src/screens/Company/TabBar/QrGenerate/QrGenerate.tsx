/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Text, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import FastImage from 'react-native-fast-image';
import {observer} from 'mobx-react';
import firestore from '@react-native-firebase/firestore';
import {toJS} from 'mobx';
import QrGenerateStyle from './QrGenerate.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import Colors from '../../../../styles/Colors';
import NoCampaign from '../../NoCampaign';
import CompanyStore from '../../../../stores/Company.store';
import {Campaign} from '../../../../schemes/company/CompanyCampaign';
import CampaignType from '../../../../schemes/company/CampaignType.enum';
import ChangeCampaignQrService from '../../../../services/company/General/ChangeCampaignQr.service';

export interface QrGenerateProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface QrGenerateState {
  activeCampaign: Campaign;
  loading: boolean;
  activeQrJson: {
    scannedQrId: string;
    campaignId: string;
    companyId: string;
  };
}
@observer
export default class QrGenerate extends React.Component<QrGenerateProps, QrGenerateState> {
  style = QrGenerateStyle;

  constructor(props: QrGenerateProps) {
    super(props);
    this.state = {
      activeCampaign: null,
      loading: true,
      activeQrJson: {
        scannedQrId: null,
        campaignId: null,
        companyId: null,
      },
    };
    const campaigns = toJS(CompanyStore.campaigns);

    campaigns.map(campaign => {
      return firestore()
        .collection('campaigns')
        .doc(campaign.campaignId)
        .onSnapshot(data => {
          this.setState({
            activeQrJson: {
              campaignId: campaign.campaignId,
              companyId: campaign.companyId,
              scannedQrId: data.data().currentQr,
            },
          });
        });
    });
  }

  componentDidMount() {
    const campaigns = toJS(CompanyStore.campaigns);

    // eslint-disable-next-line no-useless-return
    if (campaigns.length === 0) return;

    this.setState({activeCampaign: campaigns[0]});
    this.generateNewCampaignQr(campaigns[0]);
  }

  generateNewCampaignQr = (campaign: Campaign) => {
    this.setState({activeCampaign: campaign, loading: true});
    ChangeCampaignQrService.createNewQrCode(campaign.campaignId).then(newQrCode => {
      this.setState({
        activeQrJson: {
          campaignId: campaign.campaignId,
          companyId: campaign.companyId,
          scannedQrId: newQrCode,
        },
        loading: false,
      });
    });
  };

  campaignButton = (campaign: Campaign, key: string) => {
    const {activeCampaign} = this.state;

    if (!activeCampaign) return null;

    switch (campaign.campaignType) {
      case CampaignType.Drink:
        return (
          <View key={key} style={this.style.campaignCardContainer}>
            {activeCampaign.campaignId === campaign.campaignId ? (
              <TouchableOpacity
                onPress={() => this.generateNewCampaignQr(campaign)}
                style={[
                  this.style.campaignCard,
                  this.style.campaignCardCoffee,
                  this.style.campaignCardCoffeeSelected,
                ]}>
                <FastImage
                  resizeMode="contain"
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/coffeeIconWhite.png')}
                />

                <Text style={[this.style.campaignCardText, this.style.selectedText]}>
                  {campaign.campaignName}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={key}
                onPress={() => this.generateNewCampaignQr(campaign)}
                style={[this.style.campaignCard, this.style.campaignCardCoffee]}>
                <FastImage
                  resizeMode="contain"
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/coffeeIcon.png')}
                />

                <Text style={[this.style.campaignCardText, this.style.campaignCardCoffeeText]}>
                  {campaign.campaignName}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case CampaignType.Meal:
        return (
          <View style={this.style.campaignCardContainer} key={key}>
            {activeCampaign.campaignId === campaign.campaignId ? (
              <TouchableOpacity
                onPress={() => this.generateNewCampaignQr(campaign)}
                style={[
                  this.style.campaignCard,
                  this.style.campaignCardMeal,
                  this.style.campaignCardMealSelected,
                ]}>
                <FastImage
                  resizeMode="contain"
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/mealIconWhite.png')}
                />

                <Text style={[this.style.campaignCardText, this.style.selectedText]}>
                  {campaign.campaignName}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={key}
                onPress={() => this.generateNewCampaignQr(campaign)}
                style={[this.style.campaignCard, this.style.campaignCardMeal]}>
                <FastImage
                  resizeMode="contain"
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/mealIcon.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.campaignCardMealText]}>
                  {campaign.campaignName}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case 3:
        return (
          <View style={this.style.campaignCardContainer} key={key}>
            {activeCampaign.campaignId === campaign.campaignId ? (
              <TouchableOpacity
                onPress={() => this.generateNewCampaignQr(campaign)}
                style={[
                  this.style.campaignCard,
                  this.style.campaignCardDessert,
                  this.style.campaignCardDessertSelected,
                ]}>
                <FastImage
                  resizeMode="contain"
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/dessertIconWhite.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.selectedText]}>
                  {campaign.campaignName}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={key}
                onPress={() => this.generateNewCampaignQr(campaign)}
                style={[this.style.campaignCard, this.style.campaignCardDessert]}>
                <FastImage
                  resizeMode="contain"
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/dessertIcon.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.campaignCardDessertText]}>
                  {campaign.campaignName}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      default:
        return <Text key={key}>Error</Text>;
    }
  };

  public render() {
    const {navigation} = this.props;
    const campaigns = toJS(CompanyStore.campaigns);
    const {activeQrJson, loading} = this.state;

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onLeftPress={() => {
              navigation.navigate('UserDetails');
            }}
            onRightPress={() => {
              navigation.navigate('CompanyDetailsEdit');
            }}
          />
        </View>
        {campaigns.length === 0 ? (
          <NoCampaign navigation={navigation} />
        ) : (
          <View>
            <View style={this.style.qrContainer}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <QRCode
                  size={(Dimensions.get('window').width * 60) / 100}
                  color={Colors.TEXT_HIGHLIGHTED}
                  value={JSON.stringify(activeQrJson)}
                  ecl="L"
                />
              )}
            </View>
            <View style={this.style.campaignsContainer}>
              {campaigns &&
                campaigns.map((campaign, index) => {
                  return this.campaignButton(campaign, index.toString());
                })}
            </View>
            <Text style={this.style.bottomText}>
              Kampanya seçimi yaparak QR kodu uzatabilirsiniz.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
