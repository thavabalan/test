/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mtextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'symbosis.db' });
 
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
      description: '',
      light: '',
      soil: '',
      watering: '',
      image: '',
      photo: null,
      maximum_production: '',
      symbioses: '',
    };
  }
  searchUser = () => {
    const {name} =this.state;
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM plant where name = ?',
        [name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).name);
            this.setState({
                name:results.rows.item(0).name,
            });
            this.setState({
                description:results.rows.item(0).description,
            });
            this.setState({
                light:results.rows.item(0).light,
            });
            this.setState({
                soil:results.rows.item(0).soil,
               });
               this.setState({
                watering:results.rows.item(0).watering,
               });
               this.setState({
                image:results.rows.item(0).image,
               });
               this.setState({
                maximum_production:results.rows.item(0).image,
               });
               
               this.setState({
                symbioses:results.rows.item(0).image,
               });
               
          }else{
            alert('No Plant found');
            this.setState({
                name: '',
      description: '',
      light: '',
      soil: '',
      watering: '',
      image: '',
      photo: null,
      maximum_production: '',
      symbioses: '',
            });
          }
        }
      );
    });
  };
  updateUser = () => {
    var that=this;
    const { name } = this.state;
    const { description } = this.state;
    const { light } = this.state;
    const { soil } = this.state;
    const { watering } = this.state;
    const { image } = this.state;
    const { maximum_production } = this.state;
    const { symbioses } = this.state;
    if (name){
      if (description){
        if (light){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE plant set name=?, description=? , light=?, soil=?,watering=?,image=?,maximum_production=?,symbioses=? where name=?',
              [name, description, light, soil,watering,image,maximum_production,symbioses],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'Success', 'Plant updated successfully',
                    [
                      {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please fill Address');
        }
      }else{
        alert('Please fill Contact Number');
      }
    }else{
      alert('Please fill Name');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              style={{ padding:10 }}
              onChangeText={name => this.setState({ name })}
            />
            <Mybutton
              title="Search Plant"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.name}
              style={{ padding:10 }}
              onChangeText={name => this.setState({ name })}
            />
            <Mytextinput
              placeholder="Enter Description"
              value={''+ this.state.description}
              onChangeText={d => this.setState({ description })}
              maxLength={10}
              style={{ padding:10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.light}
              placeholder="Enter Light"
              onChangeText={light => this.setState({ light })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
             <Mytextinput
              value={this.state.soil}
              placeholder="Enter Soil"
              onChangeText={soil => this.setState({ soil })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mytextinput
              value={this.state.soil}
              placeholder="Enter Watering"
              onChangeText={watering => this.setState({ watering })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
             <Mytextinput
              value={this.state.image}
              placeholder="Image"
              onChangeText={image => this.setState({ image })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
             <Mytextinput
              value={this.state.maximum_production}
              placeholder="Maimum Production"
              onChangeText={maximum_production => this.setState({ maximum_production })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mytextinput
              value={this.state.symbioses}
              placeholder="Symbioses"
              onChangeText={symbioses => this.setState({ symbioses })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}