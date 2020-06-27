import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../../global/styles/Colors';
import CampaignColors from '../../../../../global/styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
  },
  headerContainer: { height: '8%', paddingHorizontal: '6%' },
  scrollView: { flex: 0.9 },
  scrollViewContainer: { paddingBottom: 100 },
  listHeader: { paddingHorizontal: '11.5%', paddingTop: 30 },
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
    fontSize: responsiveRate(20),
    color: Colors.SECONDARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'left',
    marginBottom: responsiveRate(4),
  },
  menuSectionsContainer: { marginTop: responsiveRate(20) },
  card: {
    marginTop: responsiveRate(15),
    borderRadius: 15,
    width: '88.5%',
    height: responsiveRate(75),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  otherCardBodyItem: {
    paddingHorizontal: '6%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  otherCardBodyItemName: {
    paddingLeft: '6%',
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(16),
    color: Colors.SECONDARY,
  },
  cardBodyItemIcon: {
    width: responsiveRate(28),
    height: responsiveRate(28),
    resizeMode: 'contain',
  },

  arrowContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: '4%',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  arrow: {
    width: responsiveRate(20),
    height: responsiveRate(20),
    resizeMode: 'contain',
  },
  btnContainer: {
    height: responsiveRate(56),
    paddingHorizontal: '6%',
    marginTop: responsiveRate(40),
  },
});
