/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View,Image, Alert,StyleSheet } from 'react-native';
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
export default class DeletePlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_plant_id: '',
      userData: '',
    };
  }
  deletePlant = () => {
    var that = this;
    const { input_plant_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  plants where name=?',
        [input_plant_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Plant deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Plant name');
          }
        }
      );
    });
  };
  searchPlant = () => {
    const { input_plant_id } = this.state;
    console.log(this.state.input_plant_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM plants where name = ?',
        [input_plant_id],
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
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Enter Plant Name"
          onChangeText={input_plant_id => this.setState({ input_plant_id })}
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
        <Mybutton
          title="Delete Plant"
          customClick={this.deletePlant.bind(this)}
        />
      </View>
    );
  }
}