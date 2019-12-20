/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;
console.log(screenWidth);

export default StyleSheet.create({
  keyboardScrollContainer: {flex: 1},
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '11.5%',
    borderWidth: 1,
    borderColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
  },
  uploadPhotoContainer: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
  },
  inputsContainer: {
    flex: 4,
    borderWidth: 1,

    borderColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
  },
  buttonContainer: {
    flex: 1.2,
    borderWidth: 1,

    borderColor: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
  },
});
