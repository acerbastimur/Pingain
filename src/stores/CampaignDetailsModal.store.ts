import {observable} from 'mobx';
import {UserCompany, Campaign} from '../schemes/user/UserCompany';

class CampaignDetailsStore {
  @observable isCampaignDetailsModalOpen = false;

  @observable selectedCompany: UserCompany = null;

  @observable selectedCampaign: Campaign = null;

  @observable selectedCampaignPinCount: number = null;
}

export default new CampaignDetailsStore();
