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
import {View, Text} from 'react-native';

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
      <View style={this.s.card}>
        <Text>sa</Text>
        <Text>sa</Text>
        <Text>sa</Text>
      </View>
    );
  }
}
