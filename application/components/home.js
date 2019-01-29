import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Api } from './api';

export default class Home extends Component {
    
    //Je créé mon header

    static navigationOptions = ({ navigation }) => {
        let headerStyle = { backgroundColor: '#c6e5ed', borderBottomColor: '#4FA8D2', borderBottomWidth: 2 };
        let headerTitle = "FABLIFE";
        let headerTitleStyle = { color: '#4FA8D2', fontSize: 30};
        return { headerTitle, headerTitleStyle, headerStyle }
    } 

    //Je déclare mon loader pendant le chargement de la base de données

    constructor(props) {  
        super(props);
        this.state = {
          isLoading: true,
          dataSource: null,
        }
    }

    //Je créé ma fonction qui va charger la base de données

    loadData() {
        fetch(Api +'/menus', {
            method: 'GET'
        }).then((responseData) => {
            return responseData.json();
        }).then((jsonData) => {
            this.setState({
                isLoading: false,
                apiData: jsonData
            })
        }).done();
    }

    //Je lance ma fonction loadData au démarage de l'application

    componentDidMount() {
        this.loadData()
    }

    //Je recharge la base de données à chaque fois que je vais sur la page home

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params.refresh==1) {
            this.loadData()
        }
    }

    //Je créé la fonction pour aller sur la page détails

    showDetails(id) {
        this.props.navigation.navigate("Details", {menuId : id})
    }

    render() {
        if (this.state.isLoading) {
            return (
              <View>
                <ActivityIndicator/>
              </View>
            )
        } else {
            let petitDejeuner = this.state.apiData.map((val, index) => {  
                if (val.type == "Petit-déjeuner") {
                    return (
                        <View key={index} style={home.menuContainer}>
                            <Text style={home.menuTitle}>{val.name}</Text>
                            <Button 
                                title="Détails"  
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 70,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=> this.showDetails(val.id)}
                            />
                        </View>
                    )
                }
            })
            let entree = this.state.apiData.map((val, index) => {  
                if (val.type == "Entrée") {
                    return (
                        <View key={index} style={home.menuContainer}>
                            <Text style={home.menuTitle}>{val.name}</Text>
                            <Button 
                                style={home.buttonStyle}  
                                title="Détails"  
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 70,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=> this.showDetails(val.id)}
                            />
                        </View>
                    )
                }
            })
            let plat = this.state.apiData.map((val, index) => {  
                if (val.type == "Plat") {
                    return (
                        <View key={index} style={home.menuContainer}>
                            <Text style={home.menuTitle}>{val.name}</Text>
                            <Button 
                                style={home.buttonStyle}  
                                title="Détails"  
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 70,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=> this.showDetails(val.id)}
                            />
                        </View>
                    )
                }
            })
            let collation = this.state.apiData.map((val, index) => {  
                if (val.type == "Collation") {
                    return (
                        <View key={index} style={home.menuContainer}>
                            <Text style={home.menuTitle}>{val.name}</Text>
                            <Button 
                                style={home.buttonStyle}  
                                title="Détails"  
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 70,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=> this.showDetails(val.id)}
                            />
                        </View>
                    )
                }
            })
            let dessert = this.state.apiData.map((val, index) => {  
                if (val.type == "Dessert") {
                    return (
                        <View key={index} style={home.menuContainer}>
                            <Text style={home.menuTitle}>{val.name}</Text>
                            <Button 
                                title="Détails"  
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 70,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=> this.showDetails(val.id)}
                            />
                        </View>
                    )
                }
            })
            return (
                <View style={home.container}>
                    <ScrollView style={home.secondContainer}>
                        <Text style={home.mainTitle}>NOS MENUS</Text>
                        <View style={home.titleContainer}>
                            <Text style={home.title}>Petit-déjeuner</Text>
                        </View>
                        <View>{petitDejeuner}</View>
                        <View style={home.titleContainer}>
                            <Text style={home.title}>Entrée</Text>
                        </View>
                        <View>{entree}</View>
                        <View style={home.titleContainer}>
                            <Text style={home.title}>Plat</Text>                            
                        </View>
                        <View>{plat}</View>
                        <View style={home.titleContainer}>
                            <Text style={home.title}>Collation</Text>                            
                        </View>
                        <View>{collation}</View>
                        <View style={home.titleContainer}>
                            <Text style={home.title}>Dessert</Text>                            
                        </View>
                        <View>{dessert}</View>
                    </ScrollView>
                    <View>
                        <Button 
                            title='Ajouter un nouveau menu' 
                            buttonStyle=
                            {{backgroundColor: "#4FA8D2",    
                            width: 320,
                            height: 45,
                            borderRadius: 5}} 
                            onPress={() =>this.props.navigation.navigate('AddMenu')}
                        />
                    </View>
                </View>
            )
        }
    }  
}

const home = StyleSheet.create ({
    container: {
        paddingBottom: 80,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#c6e5ed'
    },
    secondContainer: {
        height: 620
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
    menuContainer: {
        flexDirection: 'row',
        borderBottomColor: "#4FA8D2",
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    menuTitle: {
        color: "#4FA8D2",
        paddingLeft: 20,
        width: 230,
        fontSize: 20,
        paddingTop: 10
    }
})