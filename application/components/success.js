import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class Success extends Component {    

    static navigationOptions = ({ navigation }) => {
        let headerStyle = { backgroundColor: '#c6e5ed', borderBottomColor: '#4FA8D2', borderBottomWidth: 2 };
        let headerTitle = "FABLIFE";
        let headerTitleStyle = { color: '#4FA8D2', fontSize: 30};
        return { headerTitle, headerTitleStyle, headerStyle }
    }

    render() {
        return (
            <View style={success.container}>
                <View style={success.messageContainer}>
                    <Text style={success.message}>Félicitation votre menu a bien été enregistré.</Text>
                </View>
                <View>
                    <Button  
                        title='Accueil' 
                        buttonStyle=
                        {{backgroundColor: "#4FA8D2",    
                        height: 45,
                        borderRadius: 5}} 
                        onPress={() =>this.props.navigation.navigate('Home', {refresh:1})}
                    />
                </View>
            </View>
        )
    } 
}

const success = StyleSheet.create({
    container : {
        height: 750,
        backgroundColor: '#c6e5ed'
    },
    messageContainer: {
        paddingTop: 200,
        height: 600
    },
    message: {
        fontSize: 50,
        textAlign: 'center',
        color:'#4FA8D2'
    }
})