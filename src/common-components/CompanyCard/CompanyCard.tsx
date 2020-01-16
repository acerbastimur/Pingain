/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-shadow-cards';

import {NavigationScreenProp, NavigationParams, NavigationState} from 'react-navigation';
import CompanyCardStyle from './CompanyCard.style';
import CampaignDetailsStore from '../../stores/CampaignDetailsModal.store';

export interface CompanyCardProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  isCampaign1Done: boolean;
  shouldHeaderHide?: boolean;
}

export default class CompanyCard extends React.Component<CompanyCardProps, any> {
  s = CompanyCardStyle;

  constructor(props: CompanyCardProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {navigation, isCampaign1Done, shouldHeaderHide} = this.props;
    return (
      <Card elevation={6} opacity={0.15} style={this.s.card}>
        {!shouldHeaderHide && (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompanyDetails');
              }}
              style={this.s.cardHeader}>
              <View style={this.s.cardHeaderImageContainer}>
                <Image
                  source={require('../../assets/image/User/cafeImageExample.png')}
                  style={this.s.cardHeaderImage}
                />
              </View>

              <Text style={this.s.cardHeaderText}>Cafe Rien</Text>
              <Image
                style={this.s.headerArrow}
                source={require('../../assets/image/User/arrow.png')}
              />
            </TouchableOpacity>
            <View style={this.s.line} />
          </View>
        )}
        <View style={this.s.cardBody}>
          <TouchableOpacity
            style={this.s.cardBodyItem}
            onPress={() => {
              CampaignDetailsStore.campaignDetailsHalfModalRef.open();
              console.log('open modal',CampaignDetailsStore.campaignDetailsHalfModalRef);
            }}>
            <Image
              style={this.s.cardBodyItemIcon}
              source={require('../../assets/image/User/coffeeIcon.png')}
            />
            <Text style={this.s.cardBodyItemName}>Filtre Kahve Kampanyası</Text>
            <View style={[this.s.cardBodyItemCount, this.s.coffeeDoneBackground]}>
              {isCampaign1Done ? (
                <Image style={this.s.tick} source={require('../../assets/image/tickWhite.png')} />
              ) : (
                <View style={this.s.row}>
                  <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>2</Text>
                  <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>/</Text>
                  <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>6</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View style={this.s.cardBodyItem}>
            <Image
              style={this.s.cardBodyItemIcon}
              source={require('../../assets/image/User/mealIcon.png')}
            />
            <Text style={this.s.cardBodyItemName}>Makarna Kampanyası</Text>
            <View style={this.s.cardBodyItemCount}>
              <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>5</Text>
              <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>/</Text>
              <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>7</Text>
            </View>
          </View>

          <View style={this.s.cardBodyItem}>
            <Image
              style={this.s.cardBodyItemIcon}
              source={require('../../assets/image/User/dessertIcon.png')}
            />
            <Text style={this.s.cardBodyItemName}>Cheesecake Kampanyası</Text>
            <View style={this.s.cardBodyItemCount}>
              <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>5</Text>
              <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>/</Text>
              <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>12</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}
