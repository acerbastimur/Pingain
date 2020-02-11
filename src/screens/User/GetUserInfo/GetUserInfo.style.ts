/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  indicatorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  keyboardScrollContainer: {flex: 1},
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '11.5%',
  },
  uploadPhotoContainer: {
    flex: 1.6,
    justifyContent: 'center',
  },
  uploadPhotoItem: {
    width: 200,
    height: responsiveRate(140),
    paddingTop: responsiveRate(20),
    alignSelf: 'center',
  },
  inputsContainer: {
    flex: 4,
  },
  buttonContainer: {
    flex: screenHeight > 700 ? 0.23 : 0.26,
    paddingVertical: '6.75%',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {height: 40, borderColor: '#D8DFE8', color: Colors.SECONDARY, borderBottomWidth: 1},
  inputContainer: {
    flex: 0.2,
    paddingTop: 24,
  },
  dropdownComponentContainer: {overflow: 'hidden', height: 50},
  dropdownContainer: {top: -26},
  dropdownText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    color: Colors.PRIMARY,
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
