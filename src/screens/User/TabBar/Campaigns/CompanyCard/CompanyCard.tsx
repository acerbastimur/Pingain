/* eslint-disable react/no-unused-state */
/* eslint-disable react/sort-comp */
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
import {View, Text, Image} from 'react-native';
import {Card} from 'react-native-shadow-cards';

import CompanyCardStyle from './CompanyCard.style';

export interface CompanyCardProps {}

export interface CompanyCardState {}

export default class CompanyCard extends React.Component<CompanyCardProps, CompanyCardState> {
  s = CompanyCardStyle;

  constructor(props: CompanyCardProps) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

  public render() {
    return (
      <Card elevation={6} opacity={0.15} style={this.s.card}>
        <View style={this.s.cardHeader}>
          <View style={this.s.cardHeaderImageContainer}>
            <Image
              source={require('../../../../../assets/image/User/cafeImageExample.png')}
              style={this.s.cardHeaderImage}
            />
          </View>

          <Text style={this.s.cardHeaderText}>Cafe Rien</Text>
          <Image style={this.s.headerArrow} source={require('../../../../../assets/image/User/arrow.png')} />
        </View>
      </Card>
    );
  }
}
