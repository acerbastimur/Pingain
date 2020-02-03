export enum CompanyFeatures {
  internet,
  electricity,
  animalFriendly,
  matchStreaming,
  selfService,
  outdoor,
  liveMusic,
  packageService,
  reservation,
  quiteArea,
}

export interface CompanyStatistics {
  monthlyPinGiven: number;
  monthlyPrizeGiven: number;
  totalPinGiven: number;
  totalPrizeGiven: number;
}

export default interface Company {
  address: string;
  adminName: string;
  city: string;
  mail: string;
  companyFeatures: Array<CompanyFeatures>;
  campaigns: Array<string>;
  companyImages: Array<string>;
  companyLogo: string;
  companyName: string;
  instagramAccount: string;
  phoneNumber: string;
  registerDate: Date;
  statistics: CompanyStatistics;
  companyId: string;
}
