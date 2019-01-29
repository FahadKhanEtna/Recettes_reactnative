import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class Composition extends Component {

    constructor(props) {  
        super(props);
        this.state = {
          dataSource: null,
          compositionData: props.data
        }
    }

    render() {
        let composition = this.state.compositionData.map((val, index) => { 
            return(
                <View key={index}>
                    <Text style={compo.content}>{val.menu_composition}</Text>
                </View>
            )
        })
        return (
            <View>
                {composition}
            </View>
        )
    }
}

const compo = StyleSheet.create({
    content: {        
        color: "#4FA8D2",
        fontSize: 20,
        paddingLeft: 50
    }
})