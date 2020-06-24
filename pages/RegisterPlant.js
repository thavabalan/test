import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert,Image,Button,TouchableOpacity} from 'react-native';
import Mytextinput from './components/Mtextinput';
import Mybutton from './components/Mybutton';
import ImagePicker from 'react-native-image-picker';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'symbosis.db'});
export default class RegisterPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      light: '',
      soil: '',
      watering: '',
      image: '',
      //photo: null,
      maximum_production: '',
      symbioses: '',
      
    };
  }
  register_plant = () => {
    var that = this;
    const {name} = this.state;
    const {description} = this.state;
    const {light} = this.state;
    const {soil} = this.state;
    const {watering} = this.state;
    const {image} = this.state;
    const {maximum_production} = this.state;
    const {symbioses} = this.state;

    //alert(user_name, user_contact, user_address);
    if (name) {
      if (description) {
        if (light) {
          if (soil) {
            db.transaction(function(tx) {
              tx.executeSql(
                'INSERT INTO plants (name,description,light,soil,watering,image,maximum_production,symbioses) VALUES (?,?,?,?,?,?,?,?)',
                [
                  name,
                  description,
                  light,
                  soil,
                  watering,
                  image,
                  maximum_production,
                  symbioses,
                ],
                // eslint-disable-next-line no-shadow
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Registered Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            that.props.navigation.navigate('HomeScreen'),
                        },
                      ],
                      {cancelable: false},
                    );
                  } else {
                    // eslint-disable-next-line no-alert
                    alert('Registration Failed');
                  }
                },
              );
            });
          } else {
            // eslint-disable-next-line no-alert
            alert('Please fill Soil Level');
          }
        } else {
          alert('Please fill light');
        }
      } else {
        alert('Please fill description');
      }
    } else {
      alert('Please fill Name');
    }
  };
  image_t = () => {
    const options = {
      noData: true,
    }
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
   
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = 'file://' + response.path;
      this.setState({
        image: source,
      });
      console.log(response.fileName)
   
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
   
     
    }
  })};
 
  render() {
   
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={name => this.setState({name})}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Description"
              onChangeText={description => this.setState({description})}
              maxLength={10}
              keyboardType="numeric"
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Light Level"
              onChangeText={light => this.setState({light})}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mytextinput
              placeholder="Soil Level"
              onChangeText={soil => this.setState({soil})}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mytextinput
              placeholder="Watering Level"
              onChangeText={watering => this.setState({watering})}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />

        <Button title="Choose Photo" onPress={this.image_t} 
        maxLength={225}
        numberOfLines={5}
        multiline={true}
          style={{textAlignVertical: 'top', padding: 10}}
        />

            <Mytextinput
              placeholder="maximum_production"
              onChangeText={maximum_production =>
                this.setState({maximum_production})
              }
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mytextinput
              placeholder="symbioses"
              onChangeText={symbioses => this.setState({symbioses})}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mybutton
              title="Submit"
              customClick={this.register_plant.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
