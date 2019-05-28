import React from 'react';
import axios from 'axios';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    AsyncStorage,
    View,
    Modal,
    TouchableHighlight,
    Alert, ToastAndroid
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import NoteItem from '../components/NoteItem';
import EditNoteItem from '../components/EditNoteItem';
import config from "../constants/Config";

export default class HomeScreen extends React.Component {
    state = {
        modalVisible: false,
        modalData: {},
        notes: [],
        email: "",
        password: ""
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    createNewNote(data) {
        this.state.notes.push(data);
        this.setState({notes: this.state.notes, modalVisible: false}, this.syncNotes);
    }

    editNotePressed(id) {
        this.setModalVisible(true);
        this.setState({modalData: this.state.notes.find((item) => item.id === id)});
    }

    deleteNotePressed(id) {
        const newNotes = this.state.notes.filter((item) => item.id !== id);
        this.setState({notes: newNotes}, this.syncNotes);
    }
    saveAndHideModal(data) {
        this.state.notes.push(data);
        const newNotes = this.state.notes.map(el=>{
            if(el.id===data.id){
                return data
            }
            return el
        });
        this.setState({notes: newNotes, modalVisible: false}, this.syncNotes);
    }
    toastSync = () => ToastAndroid.showWithGravityAndOffset(
        'Synchronizing...',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
    );
    syncNotes = async () => {
        this.toastSync();
        try {
            await axios.post(`${config.BASE_URL}:${config.BASE_PORT}/notes`, {
                email: this.state.email,
                notes: this.state.notes
            })
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount = async () => {
        try {
            this.toastSync();
            const password = await AsyncStorage.getItem('@store:pass');
            const email = await AsyncStorage.getItem('@store:email');
            const res = await axios.get(`${config.BASE_URL}:${config.BASE_PORT}/notes/${email}`)
            this.setState({password, email, notes: res.data.data})
        } catch (e) {
            console.log(e)
            this.props.navigation.navigate("LoginScreen")
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={{}} contentContainerStyle={styles.contentContainer}>
                    {this.state.notes.map((item, i) => (
                        <NoteItem
                            key={i}
                            title={item.title}
                            content={item.content}
                            id={item.id}
                            editNoteItem={(id) => {
                                this.editNotePressed(id)
                            }}
                            deleteNoteItem={(id) => {
                                this.deleteNotePressed(id)
                            }}
                        />
                    ))}
                </ScrollView>

                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#004c8c',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Ionicons name="md-create" size={40} color="white" style={{}}
                              onPress={() => this.setModalVisible(true)}/>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <View style={styles.modalContainer}>
                        <View>
                            <EditNoteItem
                                hideModal={() => this.setModalVisible(false)}
                                saveAndHideModal={(data) => this.saveAndHideModal(data)}
                                createNewNote={(data) => this.createNewNote(data)}
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
        backgroundColor: '#e6ffff',
    },
    contentContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    modalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
