import firestore from '@react-native-firebase/firestore';
import {v4 as uuid} from 'uuid';
import GetCompanyCampaignsService from './GetCompanyCampaigns.service';

export default class ChangeCampaignQrService {
  static createNewQrCode(campaignId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const newQrCode = uuid();

      firestore()
        .collection('campaigns')
        .doc(campaignId)
        .update({
          currentQr: newQrCode,
        })
        .then(async () => {
          await GetCompanyCampaignsService.getAllCompanyCampaigns();
          resolve(newQrCode);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
