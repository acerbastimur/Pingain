import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../global/styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  indicatorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { height: '100%', paddingBottom: 80 },
  headerContainer: { height: 56, paddingHorizontal: '6%' },

  ppOverflow: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: '4%',
  },
  scrollContainerStyle: {},
  profileImage: { width: 60, height: 60 },

  profileInfoContainer: {
    flexDirection: 'row',
    marginTop: responsiveRate(30),
    paddingLeft: '11.5%',
  },
  nameText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    alignSelf: 'center',
  },
  cardsContainer: { paddingHorizontal: '6%' },
  card: {
    height: responsiveRate(75),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveRate(24),
    alignItems: 'center',
  },
  cardRight: {
    borderWidth: 1,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  cardText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(18),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  textRight: {
    fontSize: responsiveRate(22),
    color: Colors.INFO,
  },
  winCard: { marginTop: responsiveRate(30), marginBottom: responsiveRate(20) },
  activeCampText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    marginTop: responsiveRate(30),
    paddingHorizontal: '11.5%',
  },
  logoutButtonContainer: {
    height: 48,
    paddingHorizontal: '6%',
    marginTop: 20,
    marginBottom: 20,
  },
});
