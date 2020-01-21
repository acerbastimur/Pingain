import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default class RegisterService {
  static registerCompany(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
