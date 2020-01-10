import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: responsiveRate(55),
    paddingHorizontal: '11.5%',
  },
  headerText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    textAlign: 'center',
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
  textHighlighted: {
    color: Colors.TEXT_HIGHLIGHTED,
    fontWeight: '600',
  },
  imageContainer: {
    height: responsiveRate(200),
    marginTop: responsiveRate(40),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: responsiveRate(60),
    height: responsiveRate(56),
  },
});
