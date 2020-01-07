import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;
console.log(screenWidth);

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {flex: 0.1, paddingHorizontal: '6%'},
  body: {paddingHorizontal: '11.5%', flex: 1},
  topTextLight: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    marginTop: responsiveRate(30),
    marginBottom: responsiveRate(10),
  },
  topTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  bodyImage: {
    resizeMode: 'contain',
    width: (Dimensions.get('screen').width * 77) / 100,
    height: (Dimensions.get('screen').width * 77) / 100,
  },
  bottomTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: responsiveRate(20),
  },
  bottomTextLight: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
    fontStyle: 'normal',
    letterSpacing: 0.4,
    lineHeight: 26,
    textAlign: 'center',
  },
  textHighlighted: {
    color: Colors.TEXT_HIGHLIGHTED,
  },
  followButton: {
    marginTop: responsiveRate(30),
    backgroundColor: Colors.COMPANY,
    height: responsiveRate(54),
    width: '100%',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#2D8EFF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    elevation: 10,
    shadowOpacity: 0.27,
  },
  instaIcon: {
    resizeMode: 'contain',
    width: (Dimensions.get('screen').width * 8) / 100,
    height: (Dimensions.get('screen').width * 8) / 100,
    marginRight: 10,
  },

  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(18),
    color: '#fff',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    lineHeight: 26,
    textAlign: 'center',
  },
});
