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
  pageContainer: {height: '100%', paddingBottom: 80},
  headerContainer: {height: 56, paddingHorizontal: '6%'},
  listHeader: {paddingTop: 30},
  listHeaderTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  listHeaderTextLight: {
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'left',
    marginBottom: responsiveRate(4),
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  keyboardScrollContainer: {flex: 1},
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '11.5%',
  },
  ppContainer: {
    height: screenWidth < 350 ? 65 : 75,
    marginTop: 28,
    width: screenWidth < 350 ? 65 : 75,
    
  },

  formContainer: {
    flex: 1,
    marginTop: responsiveRate(10),
  },
  dropdownComponentContainer: {overflow: 'hidden', height: 50},
  dropdownContainer: {top: -26},
  dropdownText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    color: Colors.PRIMARY,
  },
  profileImage: {resizeMode: 'contain', width: 70, height: 70},
  inputContainer: {
    height: 75,
    marginTop: 20,
  },
  input: {height: 36, borderColor: '#D8DFE8', color: Colors.SECONDARY, borderBottomWidth: 1},
  image: {
    width: '6%',
    borderColor: '#D8DFE8',
    borderBottomWidth: 1,
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
    height: 52,
    marginTop: 20,
  },
  dropDownContainer: {
    marginBottom: responsiveRate(10),
  },
});
