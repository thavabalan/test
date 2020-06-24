import React from 'react';
import { Text, View, Button,Image,StyleSheet } from 'react-native';
import Mytextinput from './components/Mtextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'symbosis.db' }); 
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default class ViewPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      userData: '',
    };
  }
  
  searchPlant = () => {
    const { input_user_id } = this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM plants where name = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState({
              userData: results.rows.item(0),
            });
          } else {
            alert('No plant found');
            this.setState({
              userData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Enter Plant Name"
          onChangeText={input_user_id => this.setState({ input_user_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search Plant"
          customClick={this.searchPlant.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>Name: {this.state.userData.name}</Text>
          <Text>description: {this.state.userData.description}</Text>
          <Text>Light Level: {this.state.userData.light}</Text>
          <Text>Soil Level: {this.state.userData.soil}</Text>
          <Image style={styles.tinyLogo}
        source={{uri:this.state.userData.image}}
      />
        </View>
      </View>
    );
  }
}