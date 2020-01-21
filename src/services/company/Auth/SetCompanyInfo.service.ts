import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import Company from '../../../schemes/Company';

export default class SetCompanyInfoService {
  static SetCompanyInfo(
    adminName: string,
    companyName: string,
    instagramAccount: string,
    phoneNumber: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const companyUid = auth().currentUser.uid;
      const currentCompanyCollection = firestore()
        .collection('companies')
        .doc(companyUid);

      currentCompanyCollection
        .update({
          adminName,
          companyName,
          instagramAccount,
          phoneNumber,
        })
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
