import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import LoadingStyle from './Loading.style';
import GeneralStore from '../../stores/General.store';
import AuthRole from '../../schemes/general/AuthRole.enum';
import GetCompanyInfoService from '../../services/company/General/GetCompanyInfo.service';
import GetCompanyCampaignsService from '../../services/company/General/GetCompanyCampaigns.service';
import GetUserInfoService from '../../services/user/General/GetUserInfo.service';

export interface LoadingProps {
  isLoading: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class Loading extends React.Component<LoadingProps> {
  s = LoadingStyle;

  constructor(props: LoadingProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    //  auth().signOut();
    auth().onAuthStateChanged(async user => {
      if (user) {
        await this.checkUserRole(user);

        if (GeneralStore.authRole === AuthRole.Company) {
          // check if company fillfulled their information

          const isCompanyProfileFilled = await this.checkIfCompanyFilledProfile();
          if (isCompanyProfileFilled) {
            GetCompanyCampaignsService.getAllCompanyCampaigns().then(() => {
              navigation.navigate('CompanyTabNavigation');
            });
          } else {
            navigation.navigate('GetCompanyInfo');
          }
        } else if (GeneralStore.authRole === AuthRole.User) {
          const isUserProfileFilled = await this.checkIfUserFilledProfile();
          if (isUserProfileFilled) {
            navigation.navigate('UserTabNavigation');
          } else {
            navigation.navigate('GetUserInfo');
          }
          // check if user fillfulled their information
        }
      } else {
        navigation.navigate('Onboarding');
      }
    });
  }

  checkUserRole = async (user: FirebaseAuthTypes.User) => {
    const companyCheckRef = firestore()
      .collection('companies')
      .doc(user.uid);

    await companyCheckRef.get().then(doc => {
      if (doc.exists) {
        GeneralStore.authRole = AuthRole.Company;
      }
    });

    const userCheckRef = firestore()
      .collection('users')
      .doc(user.uid);

    await userCheckRef.get().then(doc => {
      if (doc.exists) {
        GeneralStore.authRole = AuthRole.User;
      }
    });
  };

  checkIfCompanyFilledProfile = async () => {
    let isCompanyProfileFilled = false;
    await GetCompanyInfoService.getCompanyInfo().then(companyInfo => {
      if (companyInfo.companyName) {
        isCompanyProfileFilled = true;
      }
    });
    return isCompanyProfileFilled;
  };

  checkIfUserFilledProfile = async () => {
    let isUserProfileFilled = false;
    await GetUserInfoService.getUserInfo().then(userInfo => {
      if (userInfo.name) {
        isUserProfileFilled = true;
      }
    });

    return isUserProfileFilled;
  };

  public render() {
    return (
      <View style={this.s.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
