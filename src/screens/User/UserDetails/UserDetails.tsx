import * as React from 'react';
import { View, Image, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import storage from '@react-native-firebase/storage';
import analytics from '@react-native-firebase/analytics';
import { Card } from 'react-native-shadow-cards';
import FastImage from 'react-native-fast-image';
import UserDetailsStyle from './UserDetails.style';
import TabsHeader from '../../../common-components/TabsHeader';
import GetUserInfoService from '../../../services/user/General/GetUserInfo.service';
import UserStore from '../../../stores/User.store';
import Button from '../../../common-components/Button';
import Colors from '../../../global/styles/Colors';

interface UserDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface UserDetailsState {
  loading: boolean;
  profileImageSource: string;
}
export default class UserDetails extends React.Component<UserDetailsProps, UserDetailsState> {
  style = UserDetailsStyle;

  references = [];

  constructor(props: UserDetailsProps) {
    super(props);
    this.state = { loading: false, profileImageSource: null };
  }

  componentDidMount() {
    this.setState({ loading: true });
    analytics().logEvent('userDetails_page_open', { uid: auth().currentUser.uid });

    GetUserInfoService.getUserInfo().then(() => {
      this.setState({ loading: false });
      storage()
        .ref()
        .child(UserStore.userDetails.profilePhoto)
        .getDownloadURL()
        .then(url => {
          this.setState({ profileImageSource: url, loading: false });
        });
    });
  }

  public render() {
    const { navigation } = this.props;
    const { loading, profileImageSource } = this.state;
    const {
      name,
      statistics: { totalPinEarned, totalPrizeEarned },
      surname,
    } = UserStore.userDetails;
    return loading ? (
      <View style={this.style.indicatorContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 100, height: 100 }}
          source={require('../../../assets/image/loading.gif')}
        />
      </View>
    ) : (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            rightEditIcon
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('UserDetailsEdit');
            }}
            onLeftPress={() => null}
          />
        </View>
        <ScrollView contentContainerStyle={this.style.scrollContainerStyle}>
          <View style={this.style.profileInfoContainer}>
            <View style={this.style.ppOverflow}>
              {profileImageSource ? (
                <Image source={{ uri: profileImageSource }} style={this.style.profileImage} />
              ) : null}
            </View>

            <Text style={this.style.nameText}>{`${name} ${surname}`}</Text>
          </View>
          <View style={this.style.cardsContainer}>
            <Card elevation={6} opacity={0.1} style={[this.style.card, this.style.winCard]}>
              <Text style={this.style.cardText}>Kazandığın Pin Sayısı</Text>
              <View style={this.style.cardRight}>
                <Text style={[this.style.cardText, this.style.textRight]}>{totalPinEarned}</Text>
              </View>
            </Card>
            <Card elevation={6} opacity={0.1} style={this.style.card}>
              <Text style={this.style.cardText}>Kazandığın Ödül Sayısı</Text>
              <View style={this.style.cardRight}>
                <Text style={[this.style.cardText, this.style.textRight]}>{totalPrizeEarned}</Text>
              </View>
            </Card>
          </View>
          <View style={this.style.logoutButtonContainer}>
            <Button
              text="Çıkış yap"
              backgroundColor={Colors.Background}
              borderColor={Colors.WARN}
              borderWidth={0.2}
              shadow={false}
              textColor={Colors.WARN}
              fontWeight="200"
              onPress={() => {
                auth().signOut();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
