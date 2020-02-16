/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../../../styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const fontScaleBase = 414; // iPhone 11 Pro
const responsiveRate = (rateNumber: number) => (screenWidth * rateNumber) / fontScaleBase;

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  headerContainer: {flex: 0.1, paddingHorizontal: '6%'},
  pageHeader: {paddingHorizontal: '11.5%', paddingTop: 20, flex: 0.1},
  pageHeaderTextBold: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: responsiveRate(24),
    color: Colors.PRIMARY,
    fontStyle: 'normal',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  pageHeaderTextLight: {
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(20),
    color: Colors.SECONDARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.3,
    textAlign: 'left',
    marginBottom: responsiveRate(4),
  },
  bottomArea: {flex: 0.8},
  listHeader: {
    marginTop: responsiveRate(20),
    flexDirection: 'row',
  },
  listHeaderText: {
    textDecorationLine: 'underline',
    width: '9%',
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  headerUserName: {
    marginLeft: '19.8%',
  },
  headerDate: {
    marginLeft: '14.5%',
  },
  headerTime: {
    marginLeft: '0%',
  },
  usersContainer: {marginTop: responsiveRate(30), marginBottom: 80},
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveRate(20),
    marginLeft: '19.8%',
  },
  profilePhoto: {
    resizeMode: 'contain',
    width: responsiveRate(25),
    height: responsiveRate(25),
    borderRadius: 100,
    marginLeft: '10%',
    marginRight: '3.5%',
  },
  userName: {
    width: '38%',
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(14),
    color: Colors.SECONDARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  date: {
    width: '20.4%',
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(14),
    color: Colors.SECONDARY_DARK,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  time: {
    width: '20%',
    fontFamily: 'Helvetica Neue',
    fontSize: responsiveRate(14),
    color: Colors.PRIMARY,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'left',
    marginLeft: '12%',
  },
});
