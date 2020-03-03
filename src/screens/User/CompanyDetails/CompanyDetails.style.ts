import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../../../styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (fontSize: number) => {
  if (screenWidth < 350) return ((screenWidth * fontSize) / fontScaleBase) * 0.9;
  return (screenWidth * fontSize) / fontScaleBase;
};

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 70,
  },
  headerContainer: { flex: 0.1, paddingHorizontal: '6%' },
  bodyContainer: {
    flex: 0.9,
  },
  loadingCenter: { height: '100%', justifyContent: 'center', alignItems: 'center' },

  swiperContainer: { height: 300 },
  companyInformationContainer: {
    paddingVertical: '5%',
    paddingHorizontal: '11.5%',
    width: '100%',
    borderBottomEndRadius: 44,
    borderBottomStartRadius: 44,
    marginBottom: 20,
  },
  swipeImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  companyImageContainer: { width: 65, height: 65, borderRadius: 15, overflow: 'hidden' },
  companyImage: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.SECONDARY_LIGHT,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  cardHeaderText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(25),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    marginLeft: '4%',
    width: responsiveRate(170),
  },
  followButton: {
    width: screenWidth > 350 ? 50 : 40,
    height: screenWidth > 350 ? 30 : 25,
    borderColor: Colors.INFO,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  followButtonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(10),
    color: Colors.INFO,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  line: {
    width: '98%',
    height: 0.5,
    alignSelf: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 50,
    marginTop: 20,
  },
  companyFeaturesContainer: {
    marginTop: 12,
  },
  companyFeatureCard: {
    minWidth: 80,
    height: 32,
    paddingHorizontal: 12,
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  companyFeatureCardImage: { width: 14, marginRight: 4, resizeMode: 'contain' },
  companyFeatureCardText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: responsiveRate(14),
    color: '#fff',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  phoneArea: {
    marginTop: 20,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  phoneIcon: {
    width: 26,
    height: 36,
    resizeMode: 'contain',
  },
  locationArea: {
    marginTop: 2,
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
  },
  locationIcon: {
    width: 26,
    height: 36,
  },
  contactText: {
    width: '90%',
    marginLeft: 8,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: responsiveRate(14),
    color: Colors.SECONDARY,
  },
  campaigns: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(22),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
    marginLeft: '11.5%',
  },
});
