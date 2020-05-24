import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;
export default StyleSheet.create({
  indicatorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  container: {
    height: '100%',
    paddingBottom: 80,
  },
  headerContainer: { flex: 0.113, paddingHorizontal: '6%' },
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
  cameraStyle: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  cameraWrapper: { flex: 1, width: '100%' },
  cameraCenterArea: {
    position: 'absolute',
    width: responsiveRate(200),
    height: responsiveRate(200),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 6,
    opacity: 0.4,
  },
  bottomViewStyle: { position: 'absolute', bottom: '10%' },
  bottomContentContainer: {
    height: 28,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContentText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    fontSize: responsiveRate(14),
    color: '#232323',
    padding: 16,
  },
  bottomContentBackground: {
    backgroundColor: 'white',
    opacity: 0.9,
    borderRadius: 2,
    position: 'absolute',
    width: '100%',
    height: 28,
  },
});
