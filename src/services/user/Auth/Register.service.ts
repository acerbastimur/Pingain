import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import GeneralStore from '../../../stores/General.store';
import AuthRole from '../../../schemes/general/AuthRole.enum';

export default class RegisterService {
  static registerUserAuth(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async result => {
          GeneralStore.authRole = AuthRole.User;

          const date = firestore.FieldValue.serverTimestamp();
          await this.registerUserToDB(email, date);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static registerUserToDB(
    email: string,
    registerDate: FirebaseFirestoreTypes.FieldValue,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const userUid = auth().currentUser.uid;

      firestore()
        .collection('users')
        .doc(userUid)
        .set({
          email,
          registerDate,
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
