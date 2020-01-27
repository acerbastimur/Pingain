import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Company from '../../../schemes/Company';
import CompanyStore from '../../../stores/Company.store';
import {Campaign} from '../../../schemes/CompanyCampaign';
import GetCompanyCampaignsService from './GetCompanyCampaigns.service';

export default class CreateCampaignService {
  static addCampaignToCompany(campaignId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const {uid} = auth().currentUser;

      console.log('adding campaign to company');
      firestore()
        .collection('companies')
        .doc(uid)
        .update({
          campaigns: firestore.FieldValue.arrayUnion(campaignId),
        })
        .then(() => {
          resolve();
        });
    });
  }

  static newCampaign(
    actionCount: number,
    campaignName: string,
    campaignType: number,
    prizeCount: number,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const {uid} = auth().currentUser;

      const campaignColRef = firestore()
        .collection('campaigns')
        .doc();

      campaignColRef
        .set({
          actionCount,
          campaignName,
          campaignType,
          prizeCount,
          currentQr: uid,
          companyId: uid,
          campaignId: campaignColRef.id,
        })
        .then(result => {
          console.log('girdi', result);
          this.addCampaignToCompany(campaignColRef.id).then(() => {
            GetCompanyCampaignsService.getAllCompanyCampaigns().then(() => {
              resolve();
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  static updateCampaign(
    campaignId: string,
    actionCount: number,
    campaignName: string,
    campaignType: number,
    prizeCount: number,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const {uid} = auth().currentUser;

      const campaignColRef = firestore()
        .collection('campaigns')
        .doc(campaignId);

      campaignColRef
        .update({
          actionCount,
          campaignName,
          campaignType,
          prizeCount,
        })
        .then(result => {
          console.log('girdi', result);
          GetCompanyCampaignsService.getAllCompanyCampaigns().then(() => {
            resolve();
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
