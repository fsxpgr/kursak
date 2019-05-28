import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NoteItem from '../components/NoteItem';
import EditNoteItem from '../components/EditNoteItem';

export default class HomeScreen extends React.Component {
  state = {
    modalVisible: false,
    modalData:{}
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  editNotePressed(id) {
    this.setModalVisible(true);
    this.setState({modalData:{id, name:"222", content:"333"}});
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>


          <ScrollView style={{}} contentContainerStyle={styles.contentContainer}>
            <NoteItem editNoteItem={(id)=>{this.editNotePressed(id)}}/>
            <NoteItem editNoteItem={()=>this.setModalVisible(true)}/>
          </ScrollView>

          <View style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Ionicons name="md-create" size={40} color="white" style={{}} onPress={() => this.setModalVisible(true)}/>
          </View>

          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
            <View style={styles.modalContainer}>
              <View>
                <EditNoteItem
                    hideModal={() => this.setModalVisible(false)}
                    saveAndHideModal={() => this.setModalVisible(false)}
                    modalData={this.state.modalData}
                />

              </View>
            </View>
          </Modal>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    height:'100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
