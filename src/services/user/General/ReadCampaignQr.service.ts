import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import User from '../../../schemes/user/User';
import UserStore from '../../../stores/User.store';
import {UserCompany} from '../../../schemes/user/UserCompany';

export default class ReadCampaignQr {
  static readCampaignQr(
    userId: string,
    companyId: string,
    campaignId: string,
    scannedQrId: string,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
      };

      fetch(
        `https://us-central1-pingain-app.cloudfunctions.net/readCampaignQr?scannedQrId=${scannedQrId}&userId=${userId}&campaignId=${campaignId}&companyId=${companyId}`,
        requestOptions,
      )
        .then(response => {
          if (response.status === 200 || response.status === 302) return resolve(response.status);
          return reject(response.status);
        })
        .catch(error => reject(error));
    });
  }
}
