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
    UserStore.profilePhoto = await this.getUserPhoto();

    console.log({dataSnapshot});

    return dataSnapshot;
  }

  static async getUserPhoto(): Promise<string> {
    const photoPath = UserStore.userDetails.profilePhoto;
    const url = await storage()
      .ref()
      .child(photoPath)
      .getDownloadURL();
    return url;
  }
}
