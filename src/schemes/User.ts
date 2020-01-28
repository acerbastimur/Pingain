export default interface User {
  city: string;
  mail: string;
  name: string;
  phoneNumber: string;
  profilePhoto: string;
  registerDate: Date;
  statistics: UserStatistics;
  surname: string;
}

export interface UserStatistics {
  totalPinEarned: number;
  totalPrizeEarned: number;
}
