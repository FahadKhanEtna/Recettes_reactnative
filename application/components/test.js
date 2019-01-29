import React, { Component } from 'react';

import { StyleSheet, View, Text, ScrollView, Animated, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
 
export default class MyApp extends Component
{
    constructor(props)
    {
        super(props); 
        this.state = {           
          steps: [], 
        } 
        this.animatedValue = new Animated.Value(0);        
        this.stepsIndex = 0;

    } 
    newSteps() {
        let newStep = { stepsIndex: this.stepsIndex } 
        this.setState({ steps: [ ...this.state.steps, newStep ] }, () =>        {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    useNativeDriver: true
                }
            ).start(() =>
            {
                this.stepsIndex = this.stepsIndex + 1;
            }); 
        });              
    }

    render()
    { 
        let addNewStep = this.state.steps.map(( item, key ) =>
        {
            return(
                <View 
                  key = { key } >
                    <Text> This Is Row { item.stepsIndex } </Text>
                    <TextInput style = { styles.input } />
                </View>
            );
        });
 
        return(
            <View>
                <ScrollView>
                    <View>
                    {addNewStep}
                    </View>
                </ScrollView> 
                <Button title="ajouter" onPress = {()=> this.newSteps() }/>
                        <Button title='ajouter un nouveau menu' onPress={() =>this.props.navigation.navigate('AddMenu')}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create(
{
    input: {
        borderColor: 'red',
        borderWidth: 1
    }
});