import {Dimensions} from 'react-native';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const titleFontSize = () => {
  if (screenWidth > 395) {
    return 30;
  }
  if (screenWidth < 395 && screenWidth > 350) {
    return 26;
  }

  return 20;
};
const subtitleFontSize = () => {
  if (screenWidth > 395) {
    return 16;
  }
  if (screenWidth < 395 && screenWidth > 350) {
    return 14;
  }

  return 12;
};
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
  },

  pagination: {
    bottom: 0,
    justifyContent: 'flex-start',
    left: '10%',
  },
  bottomLine: {
    backgroundColor: Colors.INFO,
    left: 0,
    right: 0,
    height: '8.5%',
    borderTopStartRadius: 76,
    justifyContent: 'center',
  },
  startButton: {
    alignSelf: 'flex-end',
    height: 50,
    marginRight: 30,
    width: 120,
    justifyContent: 'center',
  },
  startText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },

  itemContainer: {
    height: '100%',
  },
  image: {
    height: '50%',
    width: 'auto',
    resizeMode: 'contain',
    marginTop: '10%',
  },

  title: {
    width: '100%',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: titleFontSize(),
    color: Colors.PRIMARY,
    textAlign: 'left',
    paddingHorizontal: '10%',
    marginVertical: '5%',
    marginTop: '10%',
  },
  line: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
    marginVertical: '5%',
    marginHorizontal: '10%',
    borderRadius: 0.25,
  },

  subtitle: {
    flex: 0.5,
    width: '100%',
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontSize: subtitleFontSize(),
    color: Colors.SECONDARY,
    textAlign: 'left',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});
