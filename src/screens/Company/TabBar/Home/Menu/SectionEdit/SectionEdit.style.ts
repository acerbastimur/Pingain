import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../../../global/styles/Colors';
import CampaignColors from '../../../../../../global/styles/CampaignColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    zIndex:9999
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
  sectionEditSectionsContainer: { marginTop: responsiveRate(20), paddingHorizontal: '11.5%' },
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
  newProductBtn: {
    height: responsiveRate(20),
    paddingHorizontal: '6%',
    marginTop: responsiveRate(40),
  },
  inputsContainer: { marginTop: responsiveRate(30) },
  inputContainer: {
    paddingTop: 20,
  },
  input: {
    height: 40,
    minWidth: '100%',
    borderColor: '#D8DFE8',
    color: Colors.SECONDARY,
    borderBottomWidth: 1,
  },
  inputText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: responsiveRate(22),
    color: Colors.PRIMARY,
    marginBottom: screenWidth < 350 ? 4 : 8,
  },
  dropdownText: {
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(20),
    color: Colors.COMPANY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'left',
    marginBottom: responsiveRate(4),
  },
  dropdownAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  dropdownContainer: {
    width: 'auto',
    height: responsiveRate(45),
    borderRadius: 5,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
  },
  dropdownPlaceholder: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    color: Colors.SECONDARY,
    width: 'auto',
    fontSize: responsiveRate(16),
  },
  dropdownInputContainerStyle: { borderBottomColor: 'transparent' },
  dropdownInnerContainer: {
    top: -10,

    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: Colors.SECONDARY_VERY_LIGHT,
    borderWidth: 1.2,
  },
  dropdownFullWidth: { marginTop: 12, width: '100%', borderWidth: 0 },
  listHeaderText: {
    textDecorationLine: 'underline',

    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  menuTitleHeader: {
    marginTop: responsiveRate(16),
    paddingHorizontal: '11.5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemsContainer: { paddingLeft: '11.5%' },
  menuItem: {},
  menuItemInput: {
    height: 40,
    width: '62%',
    borderColor: '#D8DFE8',
    color: Colors.SECONDARY,
    borderBottomWidth: 1,
    marginRight: '5%',
  },
  priceContainer: {
    width: '18%',
    height: responsiveRate(45),
    borderRadius: 5,
    borderColor: Colors.SECONDARY_VERY_LIGHT,
    borderWidth: 1,
    justifyContent: 'center',
  },
  transparentBorder: {
    borderBottomColor: 'transparent',
  },
  crossText: {
    marginLeft: responsiveRate(10),
    fontSize: responsiveRate(18),
    color: Colors.SECONDARY,
  },
  removeElementButton: {
    height: '100%',
    justifyContent: 'center',
  },
  row: {
    marginTop: responsiveRate(26),
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
});
