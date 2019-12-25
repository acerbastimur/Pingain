import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';

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
  bottomAreaContainer: {
    flex: 0.9,
    paddingHorizontal: '6%',
  },
});
