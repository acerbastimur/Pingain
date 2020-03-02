import firestore from '@react-native-firebase/firestore';
import CompanyStore from '../../../stores/Company.store';
import { Campaign } from '../../../schemes/company/CompanyCampaign';
import GetCompanyInfoService from './GetCompanyInfo.service';

export default class GetCompanyCampaignsService {
  static async getAllCompanyCampaigns(): Promise<Array<Campaign>> {
    await GetCompanyInfoService.getCompanyInfo(); // get current company's info
    const userCampaignKeys = CompanyStore.companyDetails.campaigns; // get company's campaigns' key lis
    const userCampaigns: Array<Campaign> = []; // create a blank campaign array to be filled campaigns' details instead of it's key
    if (userCampaignKeys) {
      await Promise.all(
        userCampaignKeys.map(async campaignKey => { // iterate all campaign keys
          const companyColRef = firestore()
            .collection('campaigns')
            .doc(campaignKey);
          const dataSnapshot = (await companyColRef.get()).data() as Campaign; // get campaign's details 
          return dataSnapshot;
        }),
      ).then(values => {
        userCampaigns.push(...values) // fullfill blank campaign array
      })
    }

    CompanyStore.campaigns = userCampaigns; // update Company Store
    return userCampaigns;
  }
}
