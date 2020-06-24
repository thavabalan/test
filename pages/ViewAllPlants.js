import React from 'react';
import {FlatList, Text, View,Image, StyleSheet} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
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
export default class ViewAllPlants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM plants', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              key={item.name}
              style={{backgroundColor: 'white', padding: 20}}>
              <Text>Name: {item.name}</Text>
              <Text>description: {item.description}</Text>
              <Text>Light: {item.light}</Text>
              <Text>Soil: {item.soil}</Text>
              <Text>Watering: {item.watering}</Text>
              <Text>maximum_production: {item.maximum_production}</Text>
              <Text>symbioses: {item.symbioses}</Text>
              <Image style={styles.tinyLogo}
        source={{uri:item.image}}
      />
            </View>
          )}
        />
      </View>
    );
  }
}