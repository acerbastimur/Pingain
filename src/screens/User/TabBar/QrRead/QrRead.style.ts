import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {flex: 0.1, paddingHorizontal: '6%'},
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {flex: 1},
  cameraCenterArea: {
    position: 'absolute',
    width: responsiveRate(200),
    height: responsiveRate(200),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 6,
    opacity: 0.4,
  },
  bottomViewStyle: {position: 'absolute', bottom: '10%'},
  bottomContentContainer: {
    height: 28,
    width: '65%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContentText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    fontSize: responsiveRate(14),
    color: 'black',
  },
  bottomContentBackground: {
    backgroundColor: 'white',
    opacity: 0.5,
    borderRadius: 2,
    position: 'absolute',
    width: '100%',
    height: 28,
  },
});
