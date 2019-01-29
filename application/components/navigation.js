import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './home';

export default class Navigation extends Component {
    render () {
        return (
            <AppStackNavigator/>
        )
    }
}

const AppStackNavigator = createStackNavigator({
    Home : {
        screen: Home
    }
})