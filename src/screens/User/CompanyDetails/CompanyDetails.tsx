/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Card } from 'react-native-shadow-cards';
import FastImage from 'react-native-fast-image';
import CompanyDetailsStyle from './CompanyDetails.style';
import TabsHeader from '../../../common-components/TabsHeader';
import Colors from '../../../styles/Colors';
import CompanyCard from '../CompanyCard';
import { UserCompany } from '../../../schemes/user/UserCompany';

export interface CompanyDetailsProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface CompanyDetailsState {
  loading: boolean;
}

class CompanyDetails extends React.Component<CompanyDetailsProps, CompanyDetailsState> {
  style = CompanyDetailsStyle;

  constructor(props: CompanyDetailsProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  companyFeatureCard = (featureNo: number) => {
    switch (featureNo) {
      case 1:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              resizeMode="contain"
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/wifi.png')}
            />
            <Text style={this.style.companyFeatureCardText}>İnternet</Text>
          </View>
        );
      case 2:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/electricity.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Şarj</Text>
          </View>
        );
      case 3:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/animal.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Hayvansever</Text>
          </View>
        );
      case 4:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/matchStream.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Maç Yayını</Text>
          </View>
        );

      case 5:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/self-service.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Self Servis</Text>
          </View>
        );

      case 6:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/outdoor.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Dış Mekan</Text>
          </View>
        );

      case 7:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/liveMusic.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Canlı Müzik</Text>
          </View>
        );

      case 8:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/packageService.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Paket Servis</Text>
          </View>
        );

      case 9:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/reservation.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Rezervasyon</Text>
          </View>
        );

      case 10:
        return (
          <View key={Math.random() * 1000} style={this.style.companyFeatureCard}>
            <Image
              style={this.style.companyFeatureCardImage}
              source={require('../../../assets/image/User/CompanyFeatures/slience.png')}
            />
            <Text style={this.style.companyFeatureCardText}>Sessiz</Text>
          </View>
        );

      default:
        return null;
    }
  };

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    const company: UserCompany = navigation.getParam('company');

    return (
      <View style={this.style.container}>
        <View style={this.style.headerContainer}>
          <TabsHeader
            navigation={navigation}
            onRightPress={() => {
              navigation.navigate('UserDetails');
            }}
            onLeftPress={() => {
              return null;
            }}
          />
        </View>
        <View style={this.style.bodyContainer}>
          <ScrollView>
            <View style={this.style.swiperContainer}>
              <Swiper dotColor="#D8DFE8" activeDotColor={Colors.PRIMARY} showsButtons={false}>
                {company.companyImages.map(image => {
                  return (
                    <FastImage
                      key={Math.random() * 1000}
                      resizeMode={FastImage.resizeMode.cover}
                      source={{ uri: image }}
                      style={this.style.swipeImage}>
                      <View style={this.style.loadingCenter}>
                        <ActivityIndicator animating={loading} />
                      </View>
                    </FastImage>
                  );
                })}
              </Swiper>
            </View>
            <Card elevation={6} opacity={0.15} style={this.style.companyInformationContainer}>
              <View style={this.style.cardHeader}>
                <View style={this.style.companyImageContainer}>
                  <FastImage
                    source={{ uri: company.companyLogo, priority: 'high' }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={this.style.companyImage}>
                    <View style={this.style.loadingCenter}>
                      <ActivityIndicator animating={loading} />
                    </View>
                  </FastImage>
                </View>
                <Text style={this.style.cardHeaderText} numberOfLines={2} ellipsizeMode="tail">{company.companyName}</Text>
                {company.instagramAccount ? (
                  <TouchableOpacity
                    style={this.style.followButton}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    onPress={() => {
                      Linking.openURL(`https://www.instagram.com/${company.instagramAccount}`);
                    }}>
                    <Text style={this.style.followButtonText}>Takip et</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={this.style.line} />
              <View style={this.style.companyFeaturesContainer}>
                <ScrollView
                  horizontal
                  directionalLockEnabled
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
                  {company.companyFeatures.map(featureNo => this.companyFeatureCard(featureNo))}
                </ScrollView>
              </View>
              <TouchableOpacity style={this.style.phoneArea} onPress={() => {
                const { phoneNumber } = company;
                Linking.openURL(`tel:${phoneNumber}`)
              }}>
                <FastImage
                  style={this.style.phoneIcon}
                  resizeMode={FastImage.resizeMode.contain}
                  source={require('../../../assets/image/User/phoneIcon.png')}
                />
                <Text style={this.style.contactText}>{company.phoneNumber}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.style.locationArea}
                onPress={() => {
                  let urlParams = '';
                  const { address } = company;
                  address.split(' ').forEach(word => {
                    urlParams += word + '+'
                  });
                  Linking.openURL(`https://www.google.com/maps/place/${urlParams}`);
                }}>
                <FastImage
                  style={this.style.locationIcon}
                  resizeMode={FastImage.resizeMode.contain}
                  source={require('../../../assets/image/User/locationIcon.png')}
                />
                <Text style={this.style.contactText} numberOfLines={1}>
                  {company.address}
                </Text>
              </TouchableOpacity>
            </Card>

            <View>
              <Text style={this.style.campaigns}>Kampanyalarımız</Text>
              <CompanyCard
                key={Math.random() * 100}
                navigation={navigation}
                company={company}
                shouldHeaderHide
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CompanyDetails;
