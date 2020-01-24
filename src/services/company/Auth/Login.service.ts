import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class LoginService {
  static loginCompanyAuth(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async result => {
          const userUid = result.user.uid;

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
        .then(e => {
          console.log(e);

          resolve();
        })
        .catch(err => {
          console.log(err);

          reject();
        });
    });
  }
}
