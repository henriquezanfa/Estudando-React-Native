import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Alert } from 'react-native'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            newText: ''
        };
    }

    func() {
        const fetchConfig = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        fetch('https://us-central1-push-notification-7e387.cloudfunctions.net/miguel?nome=' + encodeURIComponent(this.state.newText), fetchConfig)
            .then((response) => {
                if (response.status === 200) {
                    Alert.alert(response.json());
                    return response;
                } else {
                    throw new Error("Something wrong");
                }
            })
            .catch((error) => {
                console.error(error);
            })



        // if(this.state.newText.trim() == '') {
        //   this.setState({text: ''});
        //   return;
        // }
        // this.setState({text: 'EAE ' + this.state.newText});
    }

    render() {
        let sWidth = (Dimensions.get('window').width) / 3;
        return (
            <View style={styles.view}>
                <Text style={styles.text}>{this.state.text}</Text>
                <View style={styles.vieww}>
                    <View style={{ width: sWidth, height: 50, backgroundColor: 'powderblue' }} />
                    <View style={{ width: sWidth, height: 50, backgroundColor: 'skyblue' }} />
                    <View style={{ width: sWidth, height: 50, backgroundColor: 'steelblue' }} />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    onChangeText={(newText) => this.setState({ newText })}
                />
                <Button
                    onPress={() => this.func()}
                    title="Me toque"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    vieww: {
        flexDirection: 'row',
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        fontSize: 20,
        height: 40,
        padding: 10
    }
});
