import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../../../styles/Colors';
import CampaignColors from '../../../styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => (screenWidth * fontSize) / fontScaleBase;

export default StyleSheet.create({
  swipeArea: {
    backgroundColor: 'gray',
    height: 4,
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: '30%',
    borderRadius: 6,
  },
  container: {
    paddingHorizontal: '6%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 30,
    height: 40,
  },
  cardHeaderImageContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    overflow: 'hidden',
  },
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
    fontSize: responsiveRate(20),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    width: responsiveRate(220),
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
    height: 0.5,
    alignSelf: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
  },
  cardBodyItem: {
    paddingHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: responsiveRate(30),
  },
  otherCardBodyItem: {
    paddingHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  cardBodyItemIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  cardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY,
  },
  otherCardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.SECONDARY,
    width: responsiveRate(170),
  },
  cardBodyItemCount: {
    flexDirection: 'row',
    position: 'absolute',
    right: '4%',
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
  pinsContainer: { marginBottom: responsiveRate(14) },

  pinsLineContainer: {
    marginTop: 2,
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  pinsFullLineContainer: {
    marginTop: 2,
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  otherCampaignsHeaderText: {
    marginHorizontal: '5%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    fontSize: responsiveRate(16),
    fontStyle: 'normal',
    color: Colors.PRIMARY,
  },

  swiperContainer: {
    height: 120,
    width: '100%',
    marginBottom: responsiveRate(10),
  },
  swipperButton: { width: 20, resizeMode: 'contain', alignSelf: 'center' },

  card: {
    marginTop: 30,
    borderRadius: 15,
    width: '76%',
    marginHorizontal: '4%',
    height: 60,
    alignSelf: 'center',
  },
  noOtherCampaignsContainer: { marginBottom: responsiveRate(30) },
  shareUsText: {
    marginHorizontal: '5%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(14),
    fontStyle: 'normal',
    color: Colors.SECONDARY,
    paddingTop: responsiveRate(16),
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  shareButtonContainer: {
    marginTop: responsiveRate(18),
    height: responsiveRate(52),
    paddingHorizontal: '4%',
  },
  textHighlighted: {
    color: Colors.TEXT_HIGHLIGHTED,
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
