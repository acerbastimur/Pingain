import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import User from '../../../schemes/user/User';
import UserStore from '../../../stores/User.store';
import {UserCompany} from '../../../schemes/user/UserCompany';

export default class GetCompaniesService {
  static getCompanies(): Promise<Array<UserCompany>> {
    return new Promise((resolve, reject) => {
      fetch('https://us-central1-pingain-app.cloudfunctions.net/getAllCompanies')
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
         })
        .catch(error => {
           reject();
        });
    });
  }
}
