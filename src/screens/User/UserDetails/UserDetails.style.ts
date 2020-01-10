import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  container: {height: '100%', paddingBottom: 80},
  headerContainer: {height: 56, paddingHorizontal: '6%'},

  ppOverflow: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: '4%',
  },
  scrollContainerStyle: {},
  profileImage: {resizeMode: 'contain', width: 60, height: 60},

  profileInfoContainer: {
    flexDirection: 'row',
    marginTop: responsiveRate(30),
    paddingLeft: '11.5%',
  },
  nameText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    alignSelf: 'center',
  },
  cardsContainer: {paddingHorizontal: '6%'},
  card: {
    height: responsiveRate(75),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveRate(24),
    alignItems: 'center',
  },
  cardRight: {
    borderWidth: 1,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  cardText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(18),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  textRight: {
    fontSize: responsiveRate(22),
    color: Colors.INFO,
  },
  winCard: {marginTop: responsiveRate(30), marginBottom: responsiveRate(20)},
  activeCampText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    marginTop: responsiveRate(30),
    paddingHorizontal: '11.5%',
  },
});
