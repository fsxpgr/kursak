import React from 'react';
import {AsyncStorage, TouchableOpacity, View, Text} from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {Ionicons} from '@expo/vector-icons';

const HomeStack = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
            header: null
            // headerRight:  <Ionicons name="md-exit" size={30} color="gray" style={{ paddingRight: 15 }} />,
        }),
    },

    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            headerTitle: 'Inotes',
            headerStyle: {
                backgroundColor: '#039be5'
            },
            headerLeft: null,
            headerRight: <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={{paddingRight:10}}>{navigation.state.params.email}</Text><TouchableOpacity onPress={async () => {
                try {
                    await AsyncStorage.removeItem('@store:pass')
                    await AsyncStorage.removeItem('@store:email')
                    navigation.navigate('LoginScreen')
                }
                catch (e) {
                    console.log(e)
                }


            }}><Ionicons name="md-exit" size={30} color="black" style={{paddingRight: 15}}/></TouchableOpacity></View>,
        }),
    },

});

export default createAppContainer(HomeStack);
