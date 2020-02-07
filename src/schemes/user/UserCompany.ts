export interface UserCompany {
  companyLogo: string;
  companyName: string;
  instagramAccount: string;
  address?: any;
  companyFeatures?: Array<number>;
  phoneNumber: string;
  companyImages?: Array<string>;
  city?: string;
  campaigns: Campaign[];
  companyId?: string;
}
export interface Campaign {
  campaignId: string;
  campaignType: number;
  prizeCount: number;
  campaignName: string;
  companyId: string;
  actionCount: number;
}
