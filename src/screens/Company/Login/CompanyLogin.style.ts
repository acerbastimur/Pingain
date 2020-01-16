import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  keyboardScrollContainer: {flex: 1},
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '11.5%',
  },
  logoContainer: {
    flex: 0.25,
    justifyContent: 'flex-end',
  },
  headerTextContainer: {
    flex: 0.3,
    paddingTop: 30,
  },
  formContainer: {
    flex: 1,
  },

  headerText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(28),
    color: Colors.PRIMARY,
    marginTop: 4,
  },
  headerTextLight: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(28),
    color: Colors.PRIMARY,
  },

  headerText2: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
    paddingTop: 15,
  },
  underline: {textDecorationLine: 'underline'},
  inputContainer: {
    flex: 0.2,
    paddingTop: screenHeight > 700 ? 20 : 30,
  },
  input: {height: 40, borderColor: '#D8DFE8', color: Colors.SECONDARY, borderBottomWidth: 1},
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
  buttonContainer: {
    flex: screenHeight > 700 ? 0.22 : 0.24,
    paddingVertical: '6.75%',
    marginTop: 20,
  },
  loginTextContainer: {
    flex: 0.36,
  },

  loginText: {
    color: Colors.PRIMARY,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveRate(16),
  },
  bottomFieldContainer: {
    flex: 0.4,
  },
  forgotPassword: {
    marginTop: responsiveRate(30),
    textAlign: 'center',
    color: Colors.SECONDARY,
    fontWeight: 'bold',
    fontSize: responsiveRate(14),
  },
});
