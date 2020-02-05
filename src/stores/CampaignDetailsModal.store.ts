import RBSheet from 'react-native-raw-bottom-sheet';
import {observable, action} from 'mobx';
import {UserCompany, Campaign} from '../schemes/user/UserCompany';

class CampaignDetailsStore {
  constructor() {
    console.log('Campaign Detail store was initialized!');
  }

  @observable campaignDetailsHalfModalRef: RBSheet = null;

  @observable selectedCompany: UserCompany = null;

  @observable selectedCampaign: Campaign = null;

  @observable selectedCampaignPinCount: number = null;
}

export default new CampaignDetailsStore();
