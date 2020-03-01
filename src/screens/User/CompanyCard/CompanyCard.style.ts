import { Dimensions, StyleSheet } from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import Colors from '../../../styles/Colors';
import CampaignColors from '../../../styles/CampaignColors';

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
    marginVertical: 20,
    marginHorizontal: 35,
    height: 40,
  },
  cardHeaderImageContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    overflow: 'hidden',
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
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(19),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    width: responsiveRate(230)
  },
  headerArrow: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  line: {
    width: '90%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
  },
  cardBody: { marginHorizontal: screenWidth < 350 ? 30 : 40, marginBottom: 30 },
  cardBodyItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  cardBodyItemIcon: {
    width: responsiveRate(28),
    height: responsiveRate(28),
    resizeMode: 'contain',
  },
  row: { flexDirection: 'row' },
  cardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY_LIGHT,
    width: responsiveRate(180)
  },
  cardBodyItemCount: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    borderRadius: 6,
  },
  cardBodyItemCountText: {
    marginHorizontal: 2,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: responsiveRate(14),
    fontStyle: 'normal',
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
