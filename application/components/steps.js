import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default class Steps extends Component {

    constructor(props) {  
        super(props);
        this.state = {
          dataSource: null,
          compositionData: props.data2
        }
    }

    render() {
        let steps = this.state.compositionData.map((val, index) => { 
            return(
                <View key={index}>
                    <Text style={step.content}>{val.menu_steps}</Text>
                </View>
            )
        })
        return (
            <View>
                {steps}
            </View>
        )
    }
}

const step = StyleSheet.create({
    content: {        
        color: "#4FA8D2",
        fontSize: 20,
        paddingLeft: 50
    }
})