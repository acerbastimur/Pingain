import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../../../../../global/styles/Colors';
import CampaignColors from '../../../../../global/styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => {
  if (screenWidth < 350) return ((screenWidth * fontSize) / fontScaleBase) * 0.9;
  return (screenWidth * fontSize) / fontScaleBase;
};

export default StyleSheet.create({
  card: { margin: 20, borderRadius: 15 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveRate(20),
    marginBottom: responsiveRate(15),
    marginHorizontal: responsiveRate(40),
    height: 40,
  },
  cardHeaderImageContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCenter: { height: '100%', justifyContent: 'center', alignItems: 'center' },
  cardHeaderImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.SECONDARY_LIGHT,
  },
  cardHeaderText: {
    paddingLeft: '4%',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(19),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    width: responsiveRate(250),
  },
  headerArrow: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  line: {
    width: '85%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
  },
  cardBody: {
    marginTop: responsiveRate(10),
    marginHorizontal: screenWidth < 350 ? 20 : 30,
    marginBottom: responsiveRate(35),
  },
  cardBodyItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: responsiveRate(20),
    marginBottom: responsiveRate(8),
  },
  cardBodyItemIcon: {
    width: responsiveRate(26),
    height: responsiveRate(26),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  row: { flexDirection: 'row' },
  cardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY_LIGHT,
    width: responsiveRate(180),
  },
  cardBodyItemCount: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    borderRadius: 6,
  },
  cardBodyItemCountText: {
    marginHorizontal: 2,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: responsiveRate(18),
  },
  cardItemCoffee: {
    color: CampaignColors.COFFEE,
  },
  cardItemMeal: {
    color: CampaignColors.MEAL,
  },
  cardItemDessert: {
    color: CampaignColors.DESSERT,
  },
  tick: {
    resizeMode: 'contain',
    width: responsiveRate(18),
    height: responsiveRate(18),
  },
  coffeeDoneBackground: {
    backgroundColor: CampaignColors.COFFEE,
    width: screenWidth < 350 ? responsiveRate(60) : responsiveRate(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealDoneBackground: {
    backgroundColor: CampaignColors.MEAL,
    width: screenWidth < 350 ? responsiveRate(60) : responsiveRate(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dessertDoneBackground: {
    backgroundColor: CampaignColors.DESSERT,
    width: screenWidth < 350 ? responsiveRate(60) : responsiveRate(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
