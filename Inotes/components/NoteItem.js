import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class NoteItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={{
                minHeight: 200,
                backgroundColor: '#fad21d',
                shadowColor: 'rgba(0,0,0,1)',
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 2,
                elevation: 3,
                marginBottom: 10
            }}onPress={() => this.props.editNoteItem(this.props.id)}>
                <View style={{
                    height: 40,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{padding: 5, color: 'black', fontSize:20, paddingLeft: 5, fontWeight: "bold"}}>{this.props.title}</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        {/*<Ionicons name="md-brush" size={32} color="#999999" style={{padding: 5}}*/}
                        {/*          />*/}
                        <Ionicons name="md-close" size={40} color="black" style={{padding: 5, opacity:0.8}}
                                  onPress={() => this.props.deleteNoteItem(this.props.id)}/>
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', width: '100%', paddingHorizontal: 5}}>
                    <Text style={{padding: 5, color: 'black', fontStyle:'italic'}}>{this.props.content}</Text>
                </View>
                <View style={{display:'flex',flexDirection:"column", position:'absolute', bottom:0, right:0,padding: 5, backgroundColor:'#fad21d', alignItems:'flex-end'}}>
                    {/*<Text style={{color: 'gray', fontStyle:'italic'}}>last edit</Text>*/}
                    <Text style={{color: 'gray', fontStyle:'italic'}}>{(new Date(this.props.id)).toLocaleTimeString()} {(new Date(this.props.id).toDateString())}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}