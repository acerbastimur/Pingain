import {Dimensions, PixelRatio} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  indicatorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    height: '100%',
    paddingBottom: 70,
  },
  headerContainer: {flex: 0.1, paddingHorizontal: '6%'},
  bottomAreaContainer: {
    flex: 0.9,
  },
  flatListHeader: {paddingHorizontal: '11.5%', paddingTop: 30},
  flatListHeaderTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  flatListHeaderTextLight: {
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(20),
    color: Colors.SECONDARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'left',
  },
});
