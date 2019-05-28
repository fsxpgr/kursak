import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class NoteItem extends React.Component {
  render() {
    return (
      <View style={{ width:'100%', minHeight: 200, backgroundColor: '#fad21d', marginBottom: 10, borderRadius:10 }}>
        <View style={{ height: 40, backgroundColor: '#ff945d', borderTopLeftRadius: 10, borderTopRightRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ padding: 5, color:'#999999' }} >Note Name</Text>
            <View style={{ display: 'flex', flexDirection: 'row'}}>
                <Ionicons name="md-brush" size={32} color="#999999" style={{ padding: 5 }} onPress={()=>this.props.editNoteItem(22)}/>
                <Ionicons name="md-close-circle" size={32} color="#999999" style={{ padding: 5 }} />
            </View>
        </View>

          <View style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
              <Text style={{ padding: 5, color:'#999999' }} >LoLoLoLoLoLoLoLoLoLofdfdfdfLoLoLooLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoL dfLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLo</Text>
          </View>
        </View>
    );
  }
}