import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {CompanyStatistics} from '../../../schemes/Company';

export default class RegisterService {
  static registerCompanyAuth(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async result => {
          const userUid = result.user.uid;
          const date = firestore.FieldValue.serverTimestamp();
          await this.registerCompanyToDB(email, date);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static registerCompanyToDB(
    email: string,
    registerDate: FirebaseFirestoreTypes.FieldValue,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userUid = auth().currentUser.uid;

      const statistics: CompanyStatistics = {
        monthlyPinGiven: 0,
        monthlyPrizeGiven: 0,
        totalPinGiven: 0,
        totalPrizeGiven: 0,
      };
      firestore()
        .collection('companies')
        .doc(userUid)
        .set({
          email,
          registerDate,
          statistics,
        })
        .then(result => {
          console.log('ok');

          resolve();
        })
        .catch(err => {
          console.log('no');

          reject(err);
        });
    });
  }
}
