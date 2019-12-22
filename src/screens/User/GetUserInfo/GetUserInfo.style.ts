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
  },
  uploadPhotoContainer: {
    flex: 2,
  },
  inputsContainer: {
    flex: 4,
  },
  buttonContainer: {
    flex: 0.22,
    paddingVertical: '6.75%',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {height: 36, borderColor: '#D8DFE8', color: Colors.SECONDARY, borderBottomWidth: 1},
  inputContainer: {
    flex: 0.2,
    paddingTop: 20,
  },
  image: {
    width: '6%',

    height: 36,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  inputText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(22),
    color: Colors.PRIMARY,
    marginBottom: screenWidth < 350 ? 4 : 8,
  },
});
