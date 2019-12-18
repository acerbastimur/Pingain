import {Dimensions} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = (screenWidth * 111.5) / 100; // Modal's width
console.log(screenWidth, fontScaleBase);

const responsiveRate = (rateNumber: number) => {
  if (screenWidth <= 350) {
    return (screenWidth * rateNumber * 0.8) / fontScaleBase;
  }
  return (screenWidth * rateNumber) / fontScaleBase;
};
console.log(screenWidth);

export default StyleSheet.create({
  modal: {
    padding: 0,
    flex: 1,
    margin: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '11.5%',
  },
  contentBox: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    minHeight: 200,
    padding: 30,
    borderRadius: 6,
    shadowColor: Colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  headerText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  subText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(20),
    color: Colors.SECONDARY,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonsContainer: {maxHeight: 140, marginBottom: 10},
  buttonContainer: {
    height: responsiveRate(52),
    marginTop: 24,
  },
});