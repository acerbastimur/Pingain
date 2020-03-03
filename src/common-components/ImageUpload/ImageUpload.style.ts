import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveFont = (fontSize: number) => (screenWidth * fontSize) / fontScaleBase;

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderColor: Colors.PRIMARY,
    borderWidth: 4,
    width: '100%',
    height: '100%',
    maxWidth: responsiveFont(120),
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  plus: {
    width: (screenWidth * 14) / 100,
    height: (screenWidth * 14) / 100,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    color: Colors.SECONDARY,
    fontSize: responsiveFont(14),
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
  },
});
