/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  ScrollView,
} from 'react-navigation';
import storage from '@react-native-firebase/storage';
import {Card} from 'react-native-shadow-cards';
import UserDetailsStyle from './UserDetails.style';
import TabsHeader from '../../../common-components/TabsHeader';
import GetUserInfoService from '../../../services/user/General/GetUserInfo.service';
import UserStore from '../../../stores/User.store';
import Button from '../../../common-components/Button';
import Colors from '../../../styles/Colors';

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
    this.state = {loading: false, profileImageSource: null};
  }

  componentDidMount() {
    this.setState({loading: true});
    GetUserInfoService.getUserInfo().then(() => {
      this.setState({loading: false});
      storage()
        .ref()
        .child(UserStore.userDetails.profilePhoto)
        .getDownloadURL()
        .then(url => {
          this.setState({profileImageSource: url, loading: false});
        });
    });
  }

  public render() {
    const {navigation} = this.props;
    const {loading, profileImageSource} = this.state;
    const {
      name,
      statistics: {totalPinEarned, totalPrizeEarned},
      surname,
    } = UserStore.userDetails;
    return loading ? (
      <View style={this.style.indicatorContainer}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
                <Image source={{uri: profileImageSource}} style={this.style.profileImage} />
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
              backgroundColor="transparent"
              borderColor={Colors.WARN}
              borderWidth={0.2}
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
