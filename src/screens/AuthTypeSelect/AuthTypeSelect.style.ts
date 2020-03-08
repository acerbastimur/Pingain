import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../global/styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveFont = (fontSize: number) => (screenWidth * fontSize) / fontScaleBase;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '11.5%',
  },
  logoContainer: {
    flex: 0.59,
    justifyContent: 'flex-end',
  },
  headerTextContainer: {
    flex: 0.75,
    paddingTop: 30,
  },
  userFieldContainer: {
    flex: 1,
    paddingTop: 20,
  },
  companyFieldContainer: {
    flex: 1,
  },
  textBold: {
    fontWeight: '700',
  },
  headerText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveFont(28),
    color: Colors.PRIMARY,
    marginTop: 4,
  },
  headerTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveFont(28),
    color: Colors.PRIMARY,
  },
  typeTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveFont(22),
    color: Colors.PRIMARY,
  },
  headerText2: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveFont(18),
    color: Colors.SECONDARY,
    paddingTop: 15,
  },

  typeTextLight: {
    paddingTop: 12,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveFont(16),
    color: Colors.SECONDARY,
  },
  buttonContainer: {
    marginTop: 30,
    height: screenHeight > 700 ? '23%' : '28%',
  },

  line: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
    marginVertical: '10%',
    borderRadius: 0.25,
  },
});
