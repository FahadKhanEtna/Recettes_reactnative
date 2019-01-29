import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class Validation extends Component {
    render() {
        return (
            <View>
                <Button title="Valider"/>
                <Button title="Annuler"/>
            </View>
        )
    }
}