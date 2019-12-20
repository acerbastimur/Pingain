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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderColor: Colors.PRIMARY,
    borderWidth: 4,
    width: (screenWidth * 28) / 100,
    height: (screenWidth * 28) / 100,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    width: (screenWidth * 14) / 100,
    height: (screenWidth * 14) / 100,
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
