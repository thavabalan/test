/*Screen gest to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView,Image, Alert,Button,TouchableOpacity } from 'react-native';
import Mytextinput from './components/Mtextinput';
import Mybutton from './components/Mybutton';
import ImagePicker from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'symbosis.db' });
 
export default class UpdatePlant extends React.Component {
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
      input_user_id: ''
      
    };
  }
  searchPlant = () => {
    const {name} =this.state;
    console.log(this.state.name);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM plants where name = ?',
        [name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).name);
            this.setState({
                name:results.rows.item(0).name,
            });
            console.log(results.rows.item(0).description);
            this.setState({
                description:results.rows.item(0).description,
            });
            console.log(results.rows.item(0).light);
            this.setState({
                light:results.rows.item(0).light,
            });
            console.log(results.rows.item(0).soil);
            this.setState({
                soil:results.rows.item(0).soil,
               });
               console.log(results.rows.item(0).watering);
               this.setState({
                watering:results.rows.item(0).watering,
               });            
               console.log(results.rows.item(0).image);
               this.setState({
                image:results.rows.item(0).image,
               });
               console.log(results.rows.item(0).maximum_production);
               this.setState({
                maximum_production:results.rows.item(0).maximum_production,
               });
               console.log(results.rows.item(0).symbioses);
               this.setState({
                symbioses:results.rows.item(0).symbioses,
                
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
      //photo: null,
      maximum_production: '',
      symbioses: '',
            });
          }
        }
      );
    });
  };
  updatePlant = () => {
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
          if (soil){
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
          alert('Please fill soil');
        }
        }else{
          alert('Please fill light level');
        }
      }else{
        alert('Please fill description');
      }
    }else{
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
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
          placeholder="Enter Plant Name"
          onChangeText={name => this.setState({ name })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search Plant"
          customClick={this.searchPlant.bind(this)}
        />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.name}
              style={{ padding:10 }}
              onChangeText={name => this.setState({ name })}
            />
            <Mytextinput
              placeholder="Enter Description"
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
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
              value={this.state.watering}
              placeholder="Enter Watering"
              onChangeText={watering => this.setState({ watering })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
        <Button title="Choose Photo" onPress={this.image_t} 
             maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}/>

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
              customClick={this.updatePlant.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}