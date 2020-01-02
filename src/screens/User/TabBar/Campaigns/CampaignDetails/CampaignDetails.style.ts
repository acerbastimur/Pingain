import {Dimensions} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../../../styles/Colors';
import CampaignColors from '../../../../../styles/CampaignColors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => {
  if (screenWidth < 350) return ((screenWidth * fontSize) / fontScaleBase) * 0.9;
  return (screenWidth * fontSize) / fontScaleBase;
};
console.log(screenWidth);

export default StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 30,
    height: 40,
  },
  cardHeaderImageContainer: {width: 32, height: 32, borderRadius: 32, overflow: 'hidden'},
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
    marginTop: 30,
    marginBottom: 30,
  },
  cardBodyItemIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  cardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY,
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
  pinsContainer: {
    marginTop: 2,
    padding: '4%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  otherCampaignsHeaderText: {
    marginTop: '5%',
    marginHorizontal: '5%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    fontSize: responsiveRate(16),
    fontStyle: 'normal',
    color: Colors.PRIMARY,
   },
  swiperContainer: {
     height: 180,
    width: '100%',
  },
  card: {
    borderRadius: 15,
    width: '80%',
    height: 130,
    marginTop:30,
    alignSelf: 'center',
  },
});
