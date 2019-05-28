import React from 'react';
import {View, Text, TextInput, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class EditNoteItem extends React.Component {
  render() {
    return (
      <View style={{ width:'100%', minHeight: 200, backgroundColor: '#fad21d', marginBottom: 10, borderRadius:10 }}>
          <TextInput
              style={{height: 40, color: 'black', borderColor: 'gray', borderBottomWidth: 2}}
              placeholder="Name"
              value={this.props.modalData.name}

              //     onChangeText={(text) => this.setState({text})}
              //      value={this.state.text}
          />
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
            {/*//  <Text style={{ padding: 5, color:'#999999' }} >sd dfLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLoLo</Text>*/}

              <TextInput
                  style={{minHeight: 40, width:'100%', borderColor: 'gray', borderBottomWidth: 2}}
                  placeholder="Content"
                  multiline={true}
                  value={this.props.modalData.content}

                  //     onChangeText={(text) => this.setState({text})}
                  //      value={this.state.text}
              />
          </View>

          <TouchableHighlight
              onPress={()=>this.props.hideModal()}>
              <Text>Hide Modal</Text>
          </TouchableHighlight>
          <TouchableHighlight
              onPress={()=>this.props.saveAndHideModal('id name and content from state')}>
              <Text>save and hide</Text>
          </TouchableHighlight>
        </View>
    );
  }
}