import { UserCompany } from '../../../schemes/user/UserCompany';

export default class GetCompaniesService {
  static getCompanies(): Promise<Array<UserCompany>> {
    return new Promise((resolve, reject) => {
      fetch('https://us-central1-pingain-app.cloudfunctions.net/getAllCompanies')
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
