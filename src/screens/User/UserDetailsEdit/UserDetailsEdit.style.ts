import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../global/styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  indicatorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageContainer: { height: '100%', paddingBottom: 80 },
  headerContainer: { height: 56, paddingHorizontal: '6%' },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  keyboardScrollContainer: { flex: 1 },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '11.5%',
  },
  ppContainer: {
    height: 80,
    marginTop: 28,
    width: 80,
  },
  ppOverflow: {
    width: 70,
    height: 70,
    borderRadius: 15,
    overflow: 'hidden',
  },
  formContainer: {
    flex: 1,
    marginTop: responsiveRate(10),
  },
  dropdownComponentContainer: { overflow: 'hidden', height: 50 },
  dropdownContainer: { top: -26 },
  dropdownText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    color: Colors.PRIMARY,
  },
  profileImage: { resizeMode: 'contain', width: 70, height: 70 },
  inputContainer: {
    height: 75,
    marginTop: 20,
  },
  input: { height: 40, borderColor: '#D8DFE8', color: Colors.SECONDARY, borderBottomWidth: 1 },
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
    height: 52,
    marginTop: 20,
  },
  dropDownContainer: {
    marginBottom: responsiveRate(10),
  },
});
