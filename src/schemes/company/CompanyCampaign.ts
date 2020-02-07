import CampaignType from './CampaignType.enum';

export interface Campaign {
  actionCount: number;
  campaignName: string;
  campaignType: CampaignType;
  companyId: string;
  currentQrId: string;
  prizeCount: number;
  campaignId: string;
  statistics: Statistics;
}

interface Statistics {
  totalPinGiven: number;
}
export interface CampaignTransactions {
  transactionDate: Date;
  userId: string;
}
