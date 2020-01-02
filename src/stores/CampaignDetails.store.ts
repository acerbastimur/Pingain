import {observable, action} from 'mobx';

class CampaignDetailsStore {
  constructor() {
    console.log('Campaign Detail store was initialized!');
  }

  @observable isCampaignSwiperScroll = false;

  @action setCampaignSwiperScroll(state: boolean) {
    this.isCampaignSwiperScroll = state;
  }
}

export default new CampaignDetailsStore();
