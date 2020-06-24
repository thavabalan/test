import React from 'react';
//import props from 'prop-types';
import {View} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';
//Connction to access the pre-populated symbosis.db
var db = openDatabase({name: 'symbosis.db', createFromLocation: 1});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='plants'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  render() {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Mytext text="" />
        <Mybutton
          title="Add Plant"
          customClick={() => this.props.navigation.navigate('Register')}
        />
        <Mybutton
          title="View All Plants"
          customClick={() => this.props.navigation.navigate('ViewAll')}
        />

<Mybutton
          title="View Plant "
          customClick={() => this.props.navigation.navigate('View')}
        />
        <Mybutton
          title="Delete Plant "
          customClick={() => this.props.navigation.navigate('Delete')}
        />
                <Mybutton
          title="Update Plant "
          customClick={() => this.props.navigation.navigate('Update')}
        />
      </View>
    );
  }
}
