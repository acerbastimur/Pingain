import {observable, action} from 'mobx';

class CampaignDetailsStore {
  constructor() {
    console.log('Campaign Detail store was initialized!');
  }

  @observable test = 'hello';

  @action setCampaignDetails() {
    this.test = 'umut';
  }
}

export default new CampaignDetailsStore();
