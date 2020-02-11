import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class LoginService {
  static loginUserAuth(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static setNewPassword(newPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      auth()
        .currentUser.updatePassword(newPassword)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
