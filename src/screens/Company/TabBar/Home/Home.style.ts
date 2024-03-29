import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../global/styles/Colors';
import CampaignColors from '../../../../global/styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollViewStyle: {},
  headerContainer: { height: '8%', paddingHorizontal: '6%' },
  headerText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginTop: responsiveRate(20),
    marginBottom: responsiveRate(10),
  },
  topTextLight: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
    fontStyle: 'normal',
    lineHeight: 26,
    letterSpacing: 0.4,
    textAlign: 'center',
    marginTop: responsiveRate(30),
    marginBottom: responsiveRate(10),
  },
  card: {
    marginTop: responsiveRate(15),
    borderRadius: 15,
    width: '88.5%',
    height: responsiveRate(76),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  errorCard: {
    marginTop: responsiveRate(15),
    borderRadius: 15,
    width: '88.5%',
    height: responsiveRate(140),
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: Colors.SECONDARY_DARK,
    borderWidth: 0.5,
  },
  otherCardBodyItem: {
    paddingHorizontal: '6%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  cardBodyItemIcon: {
    width: responsiveRate(28),
    height: responsiveRate(28),
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
    fontSize: responsiveRate(16),
    color: Colors.PRIMARY_LIGHT,
  },
  errorCardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    maxWidth: responsiveRate(300),
    height: responsiveRate(90),
    fontSize: responsiveRate(15),
    color: Colors.PRIMARY_LIGHT,
  },
  fillProfileCard: {
    height: responsiveRate(90),
  },
  fillProfileText: {
    marginTop: responsiveRate(30),
  },
  companyStatus: {
    paddingLeft: '2%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(16),
    color: Colors.PRIMARY_LIGHT,
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
    fontWeight: '700',
    fontSize: responsiveRate(22),
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
  actionsContainer: {
    marginBottom: responsiveRate(130),
  },
  arrowContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: '4%',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  arrow: {
    width: responsiveRate(20),
    height: responsiveRate(20),
    resizeMode: 'contain',
  },
  cardBodyActionIcon: {
    width: responsiveRate(25),
    height: responsiveRate(25),
    resizeMode: 'contain',
  },
});
