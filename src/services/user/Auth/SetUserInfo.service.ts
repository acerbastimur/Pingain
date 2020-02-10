import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {UserStatistics} from '../../../schemes/user/User';
import GetUserInfoService from '../General/GetUserInfo.service';

export default class SetUserInfoService {
  static setUserInfo(
    name: string,
    surname: string,
    phoneNumber: string,
    city: string,
    profilePhotoUri: string,
  ): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const userUid = auth().currentUser.uid;
      const uploadLogo = await this.uploadProfilePhotoToStorage(profilePhotoUri, userUid);

      const statistics: UserStatistics = {totalPinEarned: 0, totalPrizeEarned: 0};
      const currentUserCollection = firestore()
        .collection('users')
        .doc(userUid);

      currentUserCollection
        .update({
          name,
          surname,
          city,
          phoneNumber,
          profilePhoto: uploadLogo.metadata.fullPath,
          statistics,
        })
        .then(async () => {
          await GetUserInfoService.getUserInfo(); // to update store

          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async uploadProfilePhotoToStorage(photoUri: string, userUid: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', photoUri, true);
      xhr.send(null);
    });

    const ref = storage()
      .ref()
      .child(`users/${userUid}/profilePhoto.png`);
    return ref.put(blob);
  }

  static updateUserDetails(
    name: string,
    surname: string,
    phoneNumber: string,
    city: string,
    userLogo: string,
  ): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const {uid} = auth().currentUser;

      if (userLogo) {
        const uploadCompanyLogo = await this.uploadProfilePhotoToStorage(userLogo, uid);
      }

      const userLogoPath = `users/${uid}/profilePhoto.png`;

      const currentUserCollection = firestore()
        .collection('users')
        .doc(uid);

      await currentUserCollection
        .update({
          name,
          surname,
          phoneNumber,
          city,
          profilePhoto: userLogoPath,
        })
        .then(() => {
          GetUserInfoService.getUserInfo(); // to update store
        });
      resolve(true);
    });
  }
}
