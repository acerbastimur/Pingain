import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
        })
        .then(() => {
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

  /*  static updateUserDetails(
    companyName: string,
    adminName: string,
    phoneNumber: string,
    instagramAccount: string,
    address = '',
    city = '35',
    companyFeatures: [],
    companyImages: any,
    companyLogo: string,
  ): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const companyUid = auth().currentUser.uid;

      if (companyLogo) {
        const uploadCompanyLogo = await this.uploadCompanyLogoToStorage(companyLogo, companyUid);
      }
      const uploadedCompanyImages = await this.uploadCompanyPhotosToStorage(
        companyImages,
        companyUid,
      );
      const companyLogoPath = `companies/${companyUid}/companyLogo.png`;

      const currentCompanyCollection = firestore()
        .collection('companies')
        .doc(companyUid);

      await currentCompanyCollection
        .update({
          adminName,
          companyName,
          instagramAccount,
          phoneNumber,
          companyFeatures,
          companyImages: uploadedCompanyImages,
          city,
          address,
          companyLogo: companyLogoPath,
        })
        .then(() => {
          GetCompanyInfoService.getCompanyInfo(); // to update store
        });
      resolve(true);
    });
  } */
}
