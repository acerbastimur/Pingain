export default interface User {
  city: string;
  email: string;
  name: string;
  phoneNumber: string;
  profilePhoto: string;
  registerDate: Date;
  statistics: UserStatistics;
  surname: string;
  activeCampaigns?: Array<ActiveCampaign>;
}

export interface ActiveCampaign {
  campaignId: string;
  pinEarned: number;
  giftCode?: string;
}
export interface UserStatistics {
  totalPinEarned: number;
  totalPrizeEarned: number;
}
