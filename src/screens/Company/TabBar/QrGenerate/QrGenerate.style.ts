/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../../styles/Colors';
import CampaignColors from '../../../../styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  headerContainer: {height: '8%', paddingHorizontal: '6%'},
  qrContainer: {
    height: (Dimensions.get('window').width * 70) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').width > 350 ? responsiveRate(60) : responsiveRate(20),
  },
  campaignsContainer: {
    flexDirection: 'row',
    marginTop: responsiveRate(40),
  },
  campaignCardContainer: {
    height: responsiveRate(100),
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
  },
  campaignCard: {
    borderWidth: 1,
    borderColor: CampaignColors.COFFEE,
    height: '100%',
    width: responsiveRate(120),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignCardCoffee: {
    borderColor: CampaignColors.COFFEE,
  },
  campaignCardMeal: {
    borderColor: CampaignColors.MEAL,
  },
  campaignCardDessert: {
    borderColor: CampaignColors.DESSERT,
  },
  campaignCardCoffeeText: {
    color: CampaignColors.COFFEE,
  },
  campaignCardMealText: {
    color: CampaignColors.MEAL,
  },
  campaignCardDessertText: {
    color: CampaignColors.DESSERT,
  },
  campaignCardCoffeeSelected: {
    backgroundColor: CampaignColors.COFFEE,
  },
  campaignCardMealSelected: {
    backgroundColor: CampaignColors.MEAL,
  },
  campaignCardDessertSelected: {
    backgroundColor: CampaignColors.DESSERT,
  },
  selectedText: {color: 'white'},
  bottomText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(12),
    textAlign: 'center',
    color: Colors.PRIMARY,
    marginTop: screenWidth < 350 ? responsiveRate(20) : responsiveRate(40),
  },
  campaignCardImg: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  campaignCardText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    textAlign: 'center',
    color: CampaignColors.COFFEE,
    marginTop: 8,
  },
});
