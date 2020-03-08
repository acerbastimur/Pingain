import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../global/styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => {
  if (screenWidth < 350) return ((screenWidth * fontSize) / fontScaleBase) * 0.9;
  return (screenWidth * fontSize) / fontScaleBase;
};
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#D8DFE8',
    borderBottomWidth: 0.5,
  },
  rightTextContainer: {
    width: 'auto',
    height: 25,
  },
  imageContainer: {
    width: 25,
    height: 25,
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  backButtonContainer: {},
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { width: 18, height: 18, resizeMode: 'contain' },
  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(18),
    color: Colors.INFO,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'right',
  },
  stateWrapper: {
    flexDirection: 'row',
  },
  activeDot: {
    width: 15,
    height: 15,
    borderRadius: 30,
    backgroundColor: 'rgb(138,237,57)',
  },
  passiveDot: {
    width: 15,
    height: 15,
    borderRadius: 30,
    backgroundColor: 'rgb(224,102,102)',
  },
  stateText: {
    marginLeft: 8,
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: 14,
    color: Colors.SECONDARY_DARK,
  },
});
