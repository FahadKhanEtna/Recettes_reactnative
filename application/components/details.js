import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Api } from './api';
import { Button } from 'react-native-elements';
import Composition from './composition';
import Steps from './steps';

export default class Details extends Component {

    static navigationOptions = ({ navigation }) => {
        let headerStyle = { backgroundColor: '#c6e5ed', borderBottomColor: '#4FA8D2', borderBottomWidth: 2 };
        let headerTitle = "FABLIFE";
        let headerTitleStyle = { color: '#4FA8D2', fontSize: 30};
        return { headerTitle, headerTitleStyle, headerStyle }
    }

    constructor(props) {  
        super(props);
        this.state = {
          isLoading: true,
          dataSource: null,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const menuId = navigation.getParam('menuId');
        fetch(Api + '/menu/' + (menuId), {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            this.setState({
                isLoading: false,
                apiData: jsonData,
        })          
      }).done();  
    }

    render() {
        if (this.state.isLoading) {
            return (
              <View>
                <ActivityIndicator/>
              </View>
            )
        } else {
            let details = this.state.apiData.map((val, index) => {  
                return (
                    <ScrollView style={detail.secondContainer} key={index}>
                        <Text style={detail.mainTitle}>{val.name}</Text>
                        <View style={detail.titleContainer}>
                            <Text style={detail.title}>Type de plat</Text>
                        </View>
                        <Text style={detail.content}>{val.type}</Text>
                        <View style={detail.titleContainer}>
                            <Text style={detail.title}>Nombre de portions</Text>
                        </View>
                        <Text style={detail.content}>{val.pieces} portions</Text>
                        <View style={detail.titleContainer}>
                            <Text style={detail.title}>Etapes de réalisation de la recette</Text>
                        </View>
                        <Steps data2={val.steps}/>
                        <View style={detail.titleContainer}>
                            <Text style={detail.title}>Temps de cuisson</Text>
                        </View>
                        <Text style={detail.content}>{val.time} minute(s)</Text>
                        <View style={detail.titleContainer}>
                            <Text style={detail.title}>Ingrédients</Text>
                        </View>
                        <Composition data={val.composition}/>
                    </ScrollView>
                )
            })
            return (
                <View style={detail.container}> 
                    {details}
                        <Button 
                        title="Accueil" 
                        buttonStyle=
                        {{backgroundColor: "#4FA8D2",    
                        height: 45,
                        borderRadius: 5}} 
                        onPress={() =>this.props.navigation.navigate('Home', {refresh:1})}
                    />
                </View>
            )
        }
    }
}

const detail = StyleSheet.create ({
    container: {
        paddingBottom: 80,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#c6e5ed'
    },
    secondContainer: {
        height:620
    },
    mainTitle: {
        marginTop: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'black'
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderTopColor: 'black', 
        borderBottomColor: 'black', 
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    content: {        
        color: "#4FA8D2",
        fontSize: 20,
        paddingLeft: 50
    }
})