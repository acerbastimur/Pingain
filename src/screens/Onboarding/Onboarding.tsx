import * as React from 'react';
import {View, Text} from 'react-native';

export default class AppComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <View>
        <Text>App Component</Text>
      </View>
    );
  }
}
