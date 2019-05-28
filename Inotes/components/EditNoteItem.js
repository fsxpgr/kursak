import React from 'react';
import {View, Text, TextInput, TouchableHighlight, ToastAndroid} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class EditNoteItem extends React.Component {
    state = {
        title: "",
        id: null,
        content: ""
    }
    componentWillMount() {
        const {title, id, content} = this.props.modalData
        console.log(content)
        this.setState({title, id, content})
    }

    render() {
        return (
            <View style={{
                width: '90%',
                minHeight: 200,
                backgroundColor: '#fad21d',
                shadowColor: 'rgba(0,0,0,1)',
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 2,
                elevation: 3,
                padding: 10
            }}>
                <TextInput
                    style={{height: 40, color: 'black', borderColor: 'gray', borderBottomWidth: 2, fontSize: 18}}
                    placeholder="Title"
                    placeholderTextColor="gray"
                    value={this.state.title}
                    onChangeText={(text) => this.setState({title:text})}
                />
                <View style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10,}}>
                    <TextInput
                        style={{
                            minHeight: 100,
                            width: '100%',
                            borderColor: 'gray',
                            borderBottomWidth: 2,
                            textAlignVertical: "top",
                            fontStyle: 'italic'
                        }}
                        placeholderTextColor="gray"
                        placeholder="Content"
                        multiline={true}
                        value={this.state.content}
                        onChangeText={(text) => this.setState({content:text})}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop:10}}>
                    <Ionicons name={'md-checkmark-circle-outline'} size={50} color={'#004c8c'} onPress={() => {
                        if (!this.state.title || !this.state.content) {
                            return ToastAndroid.showWithGravityAndOffset(
                                `Title or content can\`t be empty`,
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                            );
                        }
                        if(!this.state.id){
                            return this.props.createNewNote({id:new Date(), title:this.state.title, content:this.state.content})
                        }
                        this.props.saveAndHideModal({id:this.state.id, title:this.state.title, content:this.state.content})
                    }
                    }/>
                    <Ionicons name={'md-close'} size={50} color={'#004c8c'}
                              onPress={() => this.props.hideModal('id name and content from state')}/>
                </View>
            </View>
        );
    }
}