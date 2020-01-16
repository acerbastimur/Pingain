/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import QrGenerateStyle from './QrGenerate.style';
import TabsHeader from '../../../../common-components/TabsHeader';
import Colors from '../../../../styles/Colors';
import NoCampaign from '../../../../common-components/NoCampaign';

enum CampaignTypes {
  Coffee = 1,
  Meal = 2,
  Dessert = 3,
}

export interface QrGenerateProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export interface QrGenerateState {
  campaigns: Array<any>;
  activeCampaign: CampaignTypes;
  noCampaign: boolean;
}

export default class QrGenerate extends React.Component<QrGenerateProps, QrGenerateState> {
  style = QrGenerateStyle;

  constructor(props: QrGenerateProps) {
    super(props);
    this.state = {
      noCampaign: false,
      activeCampaign: CampaignTypes.Coffee,
      campaigns: [
        {
          campaignName: CampaignTypes.Coffee,
        },
        {
          campaignName: CampaignTypes.Meal,
        },
        {
          campaignName: CampaignTypes.Dessert,
        },
      ],
    };
  }

  campaignButton = (campaign, key) => {
    const {activeCampaign} = this.state;

    switch (campaign.campaignName) {
      case 1:
        return (
          <View key={key} style={this.style.campaignCardContainer}>
            {activeCampaign === 1 ? (
              <View
                style={[
                  this.style.campaignCard,
                  this.style.campaignCardCoffee,
                  this.style.campaignCardCoffeeSelected,
                ]}>
                <Image
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/coffeeIconWhite.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.selectedText]}>Kahve</Text>
              </View>
            ) : (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  this.setState({activeCampaign: CampaignTypes.Coffee});
                }}
                style={[this.style.campaignCard, this.style.campaignCardCoffee]}>
                <Image
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/coffeeIcon.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.campaignCardCoffeeText]}>
                  Kahve
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );

      case 2:
        return (
          <View style={this.style.campaignCardContainer} key={key}>
            {activeCampaign === 2 ? (
              <View
                style={[
                  this.style.campaignCard,
                  this.style.campaignCardMeal,
                  this.style.campaignCardMealSelected,
                ]}>
                <Image
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/mealIconWhite.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.selectedText]}>Makarna</Text>
              </View>
            ) : (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  this.setState({activeCampaign: CampaignTypes.Meal});
                }}
                style={[this.style.campaignCard, this.style.campaignCardMeal]}>
                <Image
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/mealIcon.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.campaignCardMealText]}>
                  Makarna
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      case 3:
        return (
          <View style={this.style.campaignCardContainer} key={key}>
            {activeCampaign === 3 ? (
              <View
                style={[
                  this.style.campaignCard,
                  this.style.campaignCardDessert,
                  this.style.campaignCardDessertSelected,
                ]}>
                <Image
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/dessertIconWhite.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.selectedText]}>
                  Cheesecake
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  this.setState({activeCampaign: CampaignTypes.Dessert});
                }}
                style={[this.style.campaignCard, this.style.campaignCardDessert]}>
                <Image
                  style={this.style.campaignCardImg}
                  source={require('../../../../assets/image/User/dessertIcon.png')}
                />
                <Text style={[this.style.campaignCardText, this.style.campaignCardDessertText]}>
                  Cheesecake
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
    const {campaigns, noCampaign} = this.state;

    const myJson = `{
  "itemNo":"dc607b66-31b8-45aa-af55-e5f5f3f2eab7",
  "companyNo":"e5f5f3f2eab7",
  "campaignNo":"45aa",
  "itemNo":"dc607b66-31b8-45aa-af55-e5f5f3f2eab7",
 
}`;
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
        {noCampaign ? (
          <NoCampaign navigation={navigation} />
        ) : (
          <View>
            <View style={this.style.qrContainer}>
              <QRCode
                size={(Dimensions.get('window').width * 60) / 100}
                color={Colors.TEXT_HIGHLIGHTED}
                value={myJson}
                ecl="L"
              />
            </View>
            <View style={this.style.campaignsContainer}>
              {campaigns.map((campaign, index) => {
                return this.campaignButton(campaign, index);
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
