import auth from '@react-native-firebase/auth';

export default class ResetPasswordService {
  static resetPasswordWithEmail(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
