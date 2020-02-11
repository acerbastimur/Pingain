import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import GetCompanyCampaignsService from './GetCompanyCampaigns.service';

export default class CreateCampaignService {
  static addCampaignToCompany(campaignId: string): Promise<boolean> {
    return new Promise(resolve => {
      const {uid} = auth().currentUser;

      firestore()
        .collection('companies')
        .doc(uid)
        .update({
          campaigns: firestore.FieldValue.arrayUnion(campaignId),
        })
        .then(() => {
          resolve(true);
        });
    });
  }

  static newCampaign(
    actionCount: number,
    campaignName: string,
    campaignType: number,
    prizeCount: number,
  ): Promise<boolean> {
    return new Promise(resolve => {
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
        .then(() => {
          this.addCampaignToCompany(campaignColRef.id).then(() => {
            GetCompanyCampaignsService.getAllCompanyCampaigns().then(() => {
              resolve(true);
            });
          });
        });
    });
  }

  static updateCampaign(
    campaignId: string,
    actionCount: number,
    campaignName: string,
    campaignType: number,
    prizeCount: number,
  ): Promise<boolean> {
    return new Promise(resolve => {
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
        .then(() => {
          GetCompanyCampaignsService.getAllCompanyCampaigns().then(() => {
            resolve(true);
          });
        });
    });
  }
}
