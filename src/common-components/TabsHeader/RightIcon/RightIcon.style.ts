/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => {
  if (screenWidth < 350) return ((screenWidth * fontSize) / fontScaleBase) * 0.9;
  return (screenWidth * fontSize) / fontScaleBase;
};
export default StyleSheet.create({
  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.INFO,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'right',
  },
  image: {
    width: 25,
    height: 25,
  },
  profileImage: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.PRIMARY,

  },
  companyLogo: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.COMPANY,
  },
});
