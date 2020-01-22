import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default class SetCompanyInfoService {
  static setCompanyInfo(
    adminName: string,
    companyName: string,
    phoneNumber: string,
    instagramAccount: string,
    companyLogoUri: string,
  ): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const companyUid = auth().currentUser.uid;
      const uploadLogo = await this.uploadCompanyLogoToStorage(companyLogoUri, companyUid);

      console.log(uploadLogo.metadata.fullPath);

      const currentCompanyCollection = firestore()
        .collection('companies')
        .doc(companyUid);

      currentCompanyCollection
        .update({
          adminName,
          companyName,
          instagramAccount,
          phoneNumber,
          companyLogo: uploadLogo.metadata.fullPath,
        })
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static async uploadCompanyLogoToStorage(photoUri: string, companyUid: string) {
    const response = await fetch(photoUri);
    const blob = await response.blob();

    const ref = storage()
      .ref()
      .child(`companies/${companyUid}/companyLogo.png`);
    return ref.put(blob);
  }
}
