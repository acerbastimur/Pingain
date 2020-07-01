import * as React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import FastImage from 'react-native-fast-image';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import { observer } from 'mobx-react';
import MenuCardStyle from './MenuCard.style';
import CampaignType from '../../../../../schemes/company/CampaignType.enum';
import { Section } from '../../../../../schemes/company/CompanyMenu';

export interface MenuCardProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  section: Section;
}

@observer
export default class MenuCard extends React.Component<MenuCardProps, any> {
  s = MenuCardStyle;

  constructor(props: MenuCardProps) {
    super(props);
    this.state = {};
  }

  menuTypeIcon = (campaignType: number) => {
    switch (campaignType) {
      case CampaignType.Drink:
        return (
          <FastImage
            style={this.s.cardBodyItemIcon}
            resizeMode="contain"
            source={require('../../../../../assets/image/User/coffeeIcon.png')}
          />
        );
      case CampaignType.Meal:
        return (
          <FastImage
            style={this.s.cardBodyItemIcon}
            resizeMode="contain"
            source={require('../../../../../assets/image/User/mealIcon.png')}
          />
        );
      case CampaignType.Dessert:
        return (
          <FastImage
            style={this.s.cardBodyItemIcon}
            resizeMode="contain"
            source={require('../../../../../assets/image/User/dessertIcon.png')}
          />
        );
      default:
        return null;
    }
  };

  cardCount = (cardType: number, price: number) => {
    switch (cardType) {
      case CampaignType.Drink:
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemCoffee]}>{price} ₺</Text>
          </View>
        );
      case CampaignType.Meal:
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemMeal]}>{price} ₺</Text>
          </View>
        );
      case CampaignType.Dessert:
        return (
          <View style={this.s.cardBodyItemCount}>
            <Text style={[this.s.cardBodyItemCountText, this.s.cardItemDessert]}>{price} ₺</Text>
          </View>
        );
      default:
        return null;
    }
  };

  public render() {
    const {
      navigation,
      section: { sectionItems, sectionName, sectionType },
    } = this.props;

    return (
      <Card elevation={6} opacity={0.15} style={this.s.card}>
        <View>
          <View style={this.s.cardHeader}>
            <View style={this.s.cardHeaderImageContainer}>{this.menuTypeIcon(sectionType)}</View>

            <Text style={this.s.cardHeaderText} numberOfLines={1} ellipsizeMode="tail">
              {sectionName}
            </Text>
          </View>
          <View style={this.s.line} />
        </View>
        <View style={this.s.cardBody}>
          {sectionItems.map(({ itemDetails, itemId, itemName, itemPrice }) => (
            <View key={Math.random() * 1000} style={this.s.cardBodyItem}>
              <Text style={this.s.cardBodyItemName} numberOfLines={1} ellipsizeMode="tail">
                {itemName}
              </Text>
              {this.cardCount(sectionType, itemPrice)}
            </View>
          ))}
        </View>
      </Card>
    );
  }
}
