import React from 'react';
import {View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class NoteItem extends React.Component {
    render() {
        return (
            <View style={{
                minHeight: 200,
                backgroundColor: '#fad21d',
                shadowColor: 'rgba(0,0,0,1)',
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 2,
                elevation: 3,
                marginBottom: 10
            }}>
                <View style={{
                    height: 40,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{padding: 5, color: '#999999'}}>{this.props.title}</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Ionicons name="md-brush" size={32} color="#999999" style={{padding: 5}}
                                  onPress={() => this.props.editNoteItem(this.props.id)}/>
                        <Ionicons name="md-close-circle" size={32} color="#999999" style={{padding: 5}}
                                  onPress={() => this.props.deleteNoteItem(this.props.id)}/>
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <Text style={{padding: 5, color: '#999999'}}>{this.props.content}</Text>
                </View>
            </View>
        );
    }
}