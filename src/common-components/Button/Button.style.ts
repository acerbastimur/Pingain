import {StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  touchable: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  shadow: {
    shadowColor: '#2D8EFF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
  },
  text: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
  },
});
