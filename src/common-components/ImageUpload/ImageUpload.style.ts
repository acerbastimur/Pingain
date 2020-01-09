import {Dimensions} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveFont = (fontSize: number) => (screenWidth * fontSize) / fontScaleBase;
console.log(screenWidth);

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderColor: Colors.PRIMARY,
    borderWidth: 4,
    width: '100%',
    height: '100%',
    maxWidth: 120,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    width: (screenWidth * 14) / 100,
    height: (screenWidth * 14) / 100,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 21,
  },
  text: {
    color: Colors.SECONDARY,
    fontSize: responsiveFont(14),
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
  },
});
