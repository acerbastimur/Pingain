import {observable, action} from 'mobx';

class CampaignDetailsStore {
  constructor() {
    console.log('Campaign Detail store was initialized!');
  }

  @observable campaignDetailsHalfModalRef: any = null;
}

export default new CampaignDetailsStore();
