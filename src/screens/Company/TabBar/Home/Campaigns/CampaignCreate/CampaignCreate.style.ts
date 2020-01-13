import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../../../../styles/Colors';
import CampaignColors from '../../../../../../styles/CampaignColors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '6%',
  },
  headerContainer: {height: '8%'},
  scrollView: {},
  scrollViewContainer: {paddingBottom: 90, paddingHorizontal: '6%'},
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
  inputsContainer: {marginTop: responsiveRate(30)},
  inputContainer: {
    paddingTop: 20,
  },
  input: {height: 36, borderColor: '#D8DFE8', color: Colors.SECONDARY, borderBottomWidth: 1},
  inputText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(22),
    color: Colors.PRIMARY,
    marginBottom: screenWidth < 350 ? 4 : 8,
  },
  dropdownText: {
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(18),
    color: Colors.COMPANY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'left',
    marginBottom: responsiveRate(4),
  },
  dropdownAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  dropdownContainer: {
    width: 'auto',
    height: responsiveRate(45),
    borderRadius: 5,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
  },
  dropdownFullWidth: {width: '100%', borderWidth: 0},
  dropdownPlaceholder: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    color: Colors.SECONDARY,
    width: 'auto',
    fontSize: responsiveRate(16),
  },
  dropdownInputContainerStyle: {borderBottomColor: 'transparent'},
  dropdownInnerContainer: {
    top: -10,
  },
  buttonsContainer: {marginTop: responsiveRate(30)},
  buttonContainer: {
    height: responsiveRate(56),
    marginTop: responsiveRate(10),
  },
});
