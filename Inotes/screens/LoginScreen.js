import React from 'react';
import axios from 'axios';
import {
    Image,
    AsyncStorage,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    KeyboardAvoidingView,
    ToastAndroid,
    BackHandler
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import config from '../constants/Config';
import LOGO from '../assets/images/applogo.png';

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        secondStep: false
    };

    handleEmailChange = (email) => {
        this.setState({email: email});
    };

    handlePasswordChange = (password) => {
        this.setState({password: password});
    };

    handleLoginPress = async () => {
        if (!this.state.email && !this.state.password) {
            ToastAndroid.showWithGravityAndOffset(
                'Email and password can`t be empty',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            return
        }
        try {
            await axios.get(`${config.BASE_URL}:${config.BASE_PORT}/login/${this.state.email}/${this.state.password}`);
            await AsyncStorage.setItem('@store:email', this.state.email);
            await AsyncStorage.setItem('@store:pass', this.state.password);
            this.props.navigation.navigate("HomeScreen",{email:this.state.email});
        } catch (e) {
            console.log(e)
            ToastAndroid.showWithGravityAndOffset(
                'Incorrect password',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    };

    handleGetLoginCode = () => {
        if (!this.state.email) {
            //this.props.navigation.navigate('HomeScreen');
            ToastAndroid.showWithGravityAndOffset(
                'Email can`t be empty',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            return
        }
        axios.get(`${config.BASE_URL}:${config.BASE_PORT}/send-email/${this.state.email}`)
            .then(res => {
                ToastAndroid.showWithGravityAndOffset(
                    `Check your email`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                this.setState({secondStep: true})
            })
            .catch(() => {
                ToastAndroid.showWithGravityAndOffset(
                    `Email not correct`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            });
    };
    componentDidMount = async () => {
        //delete
       // this.props.navigation.navigate("HomeScreen",{email:"WOKLOLO"});
        //return
        //
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        });
        try {
            const password = await AsyncStorage.getItem('@store:pass', this.state.password);
            console.log(password)
            if (password) {
                this.props.navigation.navigate("HomeScreen", {email:this.state.email});
            }
        } catch (e) {
            //  console.log(e)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image source={LOGO} style={{height: 150, resizeMode: 'contain'}}/>
                <Text style={{color: 'gray', fontSize: 30, paddingBottom: 30}}>Inotes</Text>
                <View style={styles.form}>
                    <TextInput
                        value={this.state.email}
                        placeholderTextColor="gray"
                        keyboardType={'email-address'}
                        onChangeText={this.handleEmailChange}
                        placeholder={"Email"}
                        autoCapitalize={'none'}
                        style={styles.textInput}
                    />

                    {this.state.secondStep &&
                    <TextInput
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholderTextColor="gray"
                        keyboardType={'number-pad'}
                        textContentType={'password'}
                        onChangeText={this.handlePasswordChange}
                        placeholder={"Password"}
                        style={styles.textInput}
                    />}

                    {this.state.secondStep ? <Button title={"login"} onPress={this.handleLoginPress}/> :
                        <Button title={"get login code"} onPress={this.handleGetLoginCode}/>}

                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#b3e5fc',
        alignItems: "center",
        height: '100%',
    },
    form: {
        display: 'flex',
        justifyContent: "center",
        width: "80%"
    },
    textInput: {
        height: 40,
        marginBottom: 20,
        borderColor: "gray",
        borderBottomWidth: 2,
    },
});