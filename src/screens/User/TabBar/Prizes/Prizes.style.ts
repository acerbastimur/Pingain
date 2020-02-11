/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../../styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
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
