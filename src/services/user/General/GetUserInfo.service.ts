import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import User from '../../../schemes/user/User';
import UserStore from '../../../stores/User.store';

export default class GetUserInfoService {
  static async getUserInfo(): Promise<User> {
    const {uid} = auth().currentUser;
    const userColRef = firestore()
      .collection('users')
      .doc(uid);
    const dataSnapshot = (await userColRef.get()).data() as User;
    UserStore.userDetails = dataSnapshot;
    console.log({dataSnapshot});

    return dataSnapshot;
  }
}
