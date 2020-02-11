/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../../../styles/Colors';
import CampaignColors from '../../../../../styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => {
  return (screenWidth * fontSize) / fontScaleBase;
};

export default StyleSheet.create({
  swipeArea: {
    backgroundColor: 'gray',
    height: 4,
    marginTop: 8,
    marginHorizontal: '24%',
    borderRadius: 6,
  },
  container: {
    width: '100%',
    paddingHorizontal: '6%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 2,
    shadowOffset: {width: 0, height: 2},
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
  otherCardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.SECONDARY,
  },
  cardBodyItemCount: {
    flexDirection: 'row',
    position: 'absolute',
    right: '4%',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  cardBodyItemCountText: {
    marginHorizontal: 2,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: responsiveRate(14),
    fontStyle: 'normal',
  },
  cardItemPlus: {
    fontWeight: '600',
  },
  cardItemPlusDrink: {color: CampaignColors.COFFEE},
  cardItemPlusMeal: {color: CampaignColors.MEAL},
  cardItemPlusDessert: {color: CampaignColors.DESSERT},

  greetingContainer: {
    marginTop: responsiveRate(16),
    paddingTop: responsiveRate(10),
    marginBottom: responsiveRate(50),
  },
  greetingHeaderText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(22),
    fontStyle: 'normal',
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginBottom: responsiveRate(12),
  },
  greetingText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: responsiveRate(16),
    fontStyle: 'normal',
    color: Colors.SECONDARY,
    textAlign: 'center',
    marginBottom: responsiveRate(12),
  },
  textHighlight: {
    color: Colors.TEXT_HIGHLIGHTED,
    fontWeight: '600',
  },
  winImage: {
    marginTop: responsiveRate(14),
    resizeMode: 'contain',
    width: responsiveRate(300),
    height: responsiveRate(300),
    alignSelf: 'center',
  },
});
