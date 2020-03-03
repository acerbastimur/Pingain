import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);

const scaleBase = 812; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => {
  return (screenHeight * rateNumber) / scaleBase;
};

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '11.5%',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(26),
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  topTextLight: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
    fontStyle: 'normal',
    lineHeight: responsiveRate(26),
    letterSpacing: 0.4,
    textAlign: 'center',
    marginTop: responsiveRate(20),
    marginBottom: responsiveRate(10),
  },
  textHighlighted: {
    color: Colors.TEXT_HIGHLIGHTED,
    fontWeight: '600',
  },
  imageContainer: {
    height: responsiveRate(200),
    marginTop: screenHeight < 650 ? responsiveRate(40) : responsiveRate(30),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
