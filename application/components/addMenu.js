import React, { Component } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import renderIf from './renderIf';
import { Api } from './api';

export default class AddMenu extends Component {

    static navigationOptions = ({ navigation }) => {
        let headerStyle = { backgroundColor: '#c6e5ed', borderBottomColor: '#4FA8D2', borderBottomWidth: 2 };
        let headerTitle = "FABLIFE";
        let headerTitleStyle = { color: '#4FA8D2', fontSize: 30};
        return { headerTitle, headerTitleStyle, headerStyle }
    }

    //Déclare les variables qui contiendront mes données saisies

    constructor(props) {  
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,

            type: "Plat",
            title: "",
            pieces: "",  
            stepsMenu: "",
            time: "",
            compositionMenu: "",

            step: 1,
            steps: [],  
            composition: [],

            empty: false,
            notNumber: false
        } 
        this.stepsIndex = 0;  
        this.compositionIndex = 0;
    }

    //Je créé un nouveau champ de saisie pour les étapes de réalisation

    newSteps() {
        let newStep = { stepsIndex: this.stepsIndex } 
        this.setState({ steps: [ ...this.state.steps, newStep ] }, () =>        {
            this.stepsIndex = this.stepsIndex + 1;
        });
    }

    //Je créé un nouveau champ de saisie pour les ingrédients

    newCompositions() {
        let newComposition = { compositionIndex: this.compositionIndex } 
        this.setState({ composition: [ ...this.state.composition, newComposition ] }, () =>        {
            this.compositionIndex = this.compositionIndex + 1;
        });
    }

    //Je créé la fonction qui me permet de passer la l'étape de saisie suivante

    next() {  
        //Je vérifie si le champs est bien rempli avant de passer a l'étape suivante
        if (this.state.step == 2 && this.state.title == "" || 
        this.state.step == 3 && this.state.pieces == "" || 
        this.state.step == 4 && this.state.steps[0] == null || this.state.step == 4 && this.state.steps[0].stepsIndex == "" || this.state.step == 4 && this.state.steps.length==0 ||
        this.state.step == 5 && this.state.time == "" || 
        this.state.step == 6 && this.state.composition[0] == null || this.state.step == 6 && this.state.composition[0].compositionIndex == "" || this.state.step == 6 && this.state.composition.length==0)
        {
            this.setState({
                empty: true
            })
        } else if(isNaN(this.state.step == 3 && this.state.pieces) || this.state.step == 5 && isNaN(this.state.time)){
            //Je vérifie si les champs nombre de portions et temps de cuisson sont bien des valeurs numériques avant de passer a l'étape suivante
            this.setState({
                empty: false,
                notNumber : true
            })
        } 
        else {
            this.setState({
                step: ++this.state.step,
                empty: false,
                notNumber : false,
                stepsMenu: "- "+this.state.steps[0],
                compositionMenu: "- "+this.state.composition[0]
            })
        }
    }    
    
    //Je créé la fonction qui me permet de passer la l'étape de saisie précedente

    back() {        
        this.setState({
            step: --this.state.step,
            empty: false,
            notNumber : false
        })
    }

    //Je créé ma fonction qui me permet de valider ma saisie et d'envoyer mes données dans la base de données
    
    validationMenu() {
        if(
            this.state.type=="" ||
            this.state.time=="" ||
            this.state.pieces=="" ||
            this.state.steps[0] == null||this.state.steps[0].stepsIndex == ""||this.state.steps.length==0 ||
            this.state.time ==""||
            this.state.composition[0] == null||this.state.composition[0].compositionIndex == ""||this.state.composition.length==0)
        {
            this.setState ({
                empty: true
            })
        } else {
            fetch(Api + '/menus', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        menu: {
                            type: this.state.type,
                            name: this.state.title,
                            pieces: this.state.pieces,
                            time: this.state.time,
                        },
                        steps: this.state.steps,
                        composition: this.state.composition
                    }
                )
            }).then((responseData) => {
                return responseData.json()
            }).then((jsonData) => {
                this.setState({
                    apiData: jsonData
                })  
            }).done();
    
            this.setState({
                step: 1,
                type: "Plat",
                title: "",
                steps: [],  
                pieces: "",
                time: "",
                composition: [],
                empty: false,
                notNumber: false
                    
            })
            this.props.navigation.navigate('Success')
        }
    }

    //Je créé ma fonction qui me permet de modifier mes saisies
 
    editMenu() {
        this.setState({
            step: 1,
            empty: false,
        })
    }

    //Je créé ma fonction qui me permet d'annuler mes saisies

    cancelMenu() {
        this.setState({
            step: 1,
            type: "Plat",
            title: "",
            steps: [],  
            pieces: "",
            time: "",
            composition: [],
            empty: false,
            notNumber: false
        })
        this.props.navigation.navigate('Home')
    }

    render() {
        let addNewStep = this.state.steps.map((item, key) =>
        {
            return(
                <View key = { key } >
                    <Text> Etape {key+1}</Text>
                    <TextInput style={addMenu.input} onChangeText={(steps) => this.state.steps[key] = steps}/>
                </View>
            );
        });
        let addNewComposition = this.state.composition.map((item2, key2) =>
        {
            return(
                <View key = { key2 } >
                    <Text> Ingrédient {key2+1}</Text>
                    <TextInput style={addMenu.input} onChangeText={(composition) => this.state.composition[key2] =composition}/>
                </View>
            );
        });
        return (
            <View style={addMenu.container}>
                <Text style={addMenu.mainTitle}>AJOUTER UN NOUVEAU MENU</Text>
                <View style={addMenu.secondContainer}>
                    <View style={addMenu.stepsIndicateur}>
                        <Text style={ this.state.step == 1 ? addMenu.active : addMenu.desactive }>1</Text>
                        <Text style={ this.state.step == 2 ? addMenu.active : addMenu.desactive }>2</Text>
                        <Text style={ this.state.step == 3 ? addMenu.active : addMenu.desactive }>3</Text>
                        <Text style={ this.state.step == 4 ? addMenu.active : addMenu.desactive }>4</Text>
                        <Text style={ this.state.step == 5 ? addMenu.active : addMenu.desactive }>5</Text>
                        <Text style={ this.state.step == 6 ? addMenu.active : addMenu.desactive }>6</Text>
                        <Text style={ this.state.step == 7 ? addMenu.active : addMenu.desactive }>7</Text>                 
                    </View>
                    <View style={ this.state.step == 1 ? addMenu.show : addMenu.hide }>
                        <View style={addMenu.titleContainer}>
                            <Text style={addMenu.title}>Type de plat</Text>                        
                        </View>
                        <View style={addMenu.inputContainer}>
                            <Picker selectedValue={this.state.type} onValueChange={(itemValue, itemIndex) => { this.setState({type: itemValue})}}>                        
                                <Picker.Item style={addMenu.picker} label="Petit-déjeuner" value="Petit-déjeuner"/>
                                <Picker.Item style={addMenu.picker} label="Entrée" value="Entrée"/>
                                <Picker.Item style={addMenu.picker} label="Plat" value="Plat"/>
                                <Picker.Item style={addMenu.picker} label="Collation" value="Collation"/>
                                <Picker.Item style={addMenu.picker} label="Dessert" value="Dessert"/>
                            </Picker>
                        </View>
                    </View>
                    <View style={ this.state.step == 2 ? addMenu.show : addMenu.hide }>
                        <View style={addMenu.titleContainer}>
                            <Text style={addMenu.title}>Titre de la recette</Text>
                        </View>
                        {renderIf(this.state.empty, 
                        <View style={addMenu.emptyContainer}>
                            <Text style={addMenu.empty}>*Le champ titre est obligatoire</Text>
                        </View>
                        )}
                        <View style={addMenu.inputContainer}>
                            <TextInput style={addMenu.input} onChangeText={(title) => this.setState({title})} value={this.state.title}/>
                        </View>
                    </View>
                    <View style={ this.state.step == 3 ? addMenu.show : addMenu.hide }>
                        <View style={addMenu.titleContainer}>
                            <Text style={addMenu.title}>Nombre de portions</Text>
                        </View>
                        {renderIf(this.state.empty, 
                        <View style={addMenu.emptyContainer}>
                            <Text style={addMenu.empty}>*Le nombre de portions est obligatoire</Text>
                        </View>
                        )}
                        {renderIf(this.state.notNumber, 
                        <View style={addMenu.emptyContainer}>
                            <Text style={addMenu.empty}>*La saisie doit être un chiffre</Text>
                        </View>
                        )}
                        <View style={addMenu.inputContainer}>
                            <TextInput style={addMenu.input} onChangeText={(pieces) => this.setState({pieces})} value={this.state.pieces}/>
                        </View>
                    </View>
                    <View style={ this.state.step == 4 ? addMenu.show : addMenu.hide }>
                        <ScrollView style={{height:420}}>
                            <View style={addMenu.titleContainer}>
                                <Text style={addMenu.title}>Etapes de réalisation de la recette</Text>
                            </View>
                            {renderIf(this.state.empty, 
                            <View style={addMenu.emptyContainer}>
                                <Text style={addMenu.empty}>*Les étapes sont obligatoires</Text>
                            </View>
                            )}
                            <View style={[addMenu.inputContainer, addMenu.inputContainerHeight]}>     
                                {addNewStep}
                            </View>
                        </ScrollView>
                        <View>
                            <Button 
                                title="Ajouter une étape" 
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",   
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=>this.newSteps()}
                            />
                        </View>
                    </View>
                    <View style={ this.state.step == 5 ? addMenu.show : addMenu.hide }>
                        <View style={addMenu.titleContainer}>
                            <Text style={addMenu.title}>Temps de cuisson en minutes</Text>
                        </View>
                        {renderIf(this.state.empty, 
                        <View style={addMenu.emptyContainer}>
                            <Text style={addMenu.empty}>*Le temps de cuisson est obligatoire</Text>
                        </View>
                        )}
                        {renderIf(this.state.notNumber, 
                        <View style={addMenu.emptyContainer}>
                            <Text style={addMenu.empty}>*La saisie doit être un chiffre</Text>
                        </View>
                        )}
                        <View style={addMenu.inputContainer}>
                            <TextInput style={addMenu.input} onChangeText={(time) => this.setState({time})} value={this.state.time}/>
                        </View>
                    </View>
                    <View style={ this.state.step == 6 ? addMenu.show : addMenu.hide }>
                        <ScrollView style={{height:420}}>
                            <View style={addMenu.titleContainer}>
                                <Text style={addMenu.title}>Ingrédients</Text>
                            </View>
                            {renderIf(this.state.empty, 
                            <View style={addMenu.emptyContainer}>
                                <Text style={addMenu.empty}>*Les ingrédients obligatoires</Text>
                            </View>
                            )}
                            <View style={[addMenu.inputContainer, addMenu.inputContainerHeight]}>     
                                {addNewComposition}
                            </View>
                        </ScrollView>
                        <View>
                            <Button 
                                title="Ajouter un ingrédient" 
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",   
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=>this.newCompositions()}
                            />
                        </View>
                    </View>
                    <ScrollView style={ this.state.step == 7 ? addMenu.show : addMenu.hide }>
                        <View style={addMenu.validationContainer}>
                            {renderIf(this.state.empty, 
                            <View style={addMenu.emptyContainer}>
                                <Text style={addMenu.empty}>*Tous les champs ne sont pas remplis</Text>
                            </View>
                            )}
                            <View style={addMenu.compositionContainer}>
                                <Text style={addMenu.compositionDetail}>Type de plat : {this.state.type}</Text>
                            </View>
                            <View style={addMenu.compositionContainer}>
                                <Text style={addMenu.compositionDetail}>Titre de la recette : {this.state.title}</Text>
                            </View>
                            <View style={addMenu.compositionContainer}>
                                <Text style={addMenu.compositionDetail}>Nombre de portions : {this.state.pieces}</Text>
                            </View>
                            <View style={addMenu.compositionContainer}>
                                <Text style={addMenu.compositionDetail}>Etapes de réalisation de la recette: </Text>
                                <Text style={addMenu.compositionDetail}>{this.state.stepsMenu}</Text>
                            </View>
                            <View style={addMenu.compositionContainer}>
                                <Text style={addMenu.compositionDetail}>Temps de cuisson en minutes : {this.state.time} minute(s)</Text>
                            </View>
                            <View style={addMenu.compositionContainer}>
                                <Text style={addMenu.compositionDetail}>Ingrédients : </Text>
                                <Text style={addMenu.compositionDetail}>{this.state.compositionMenu}</Text>
                            </View>
                        </View>
                    </ScrollView> 
                </View>
                <View style={addMenu.buttonContainer}>
                    {renderIf(this.state.step == 1, 
                        <Button  
                            title='Accueil' 
                            buttonStyle=
                            {{backgroundColor: "#4FA8D2",    
                            width: 147,
                            height: 45,
                            borderRadius: 5}} 
                            onPress={() =>this.props.navigation.navigate('Home', {refresh:1})}
                        />
                    )}
                    {renderIf(this.state.step > 1 && this.state.step < 7, 
                        <Button
                            title='Précédent' 
                            buttonStyle=
                            {{backgroundColor: "#4FA8D2",    
                            width: 147,
                            height: 45,
                            borderRadius: 5}} 
                            onPress={()=>this.back()}
                        />
                    )}
                    {renderIf(this.state.step <= 6, 
                        <Button 
                            title='Suivant' 
                            buttonStyle=
                            {{backgroundColor: "#4FA8D2",    
                            width: 147,
                            height: 45,
                            borderRadius: 5}} 
                            onPress={()=>this.next()}
                        />
                    )}
                </View>
                {renderIf(this.state.step == 7, 
                    <View>
                        <View style={addMenu.buttonContainer}>
                            <Button 
                                title='Modifier' 
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 147,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=>this.editMenu()}
                            />
                            <Button 
                                title='Annuler' 
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                width: 147,
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=>this.cancelMenu()}
                            />
                        </View>
                        <View style={{marginTop:10}}>
                            <Button 
                                title='Valider' 
                                buttonStyle=
                                {{backgroundColor: "#4FA8D2",    
                                height: 45,
                                borderRadius: 5}} 
                                onPress={()=>this.validationMenu()}
                            />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const addMenu = StyleSheet.create ({
    container: {
        paddingBottom: 80,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#c6e5ed'
    },
    mainTitle: {
        marginTop: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'black'
    },
    secondContainer: {
        height: 550,
    },
    stepsIndicateur: {
        marginTop: 20,
        flexDirection:'row',
    },
    titleContainer: {
        marginTop: 40,
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
    picker: {
        textAlign: 'center', 
        fontSize: 15
    },
    inputContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        borderColor: '#4FA8D2', 
        marginBottom: 10,
        borderWidth: 1,
        fontSize: 15,
        padding: 10
    },
    emptyContainer: {
        marginBottom: 20, 
        backgroundColor: 'red'
    },
    empty: {      
        padding : 20,
        fontSize: 20,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        width: 150
    },
    show: {
        display: 'flex',
    },
    hide: {
        display: 'none'
    },
    active: {
        width: 50,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        color:'lightblue',
        backgroundColor: '#4FA8D2',
        borderWidth: 1,
        borderColor: 'white',
        fontSize: 25
    },
    desactive: {
        width: 50,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        color:'white',
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        borderColor: 'white',
        fontSize: 25
    },
    inputContainerHeight : {
        height: 300
    },
    validationContainer: {
        height: 400
    },
    compositionContainer: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderTopColor: '#4FA8D2', 
        borderBottomColor: '#4FA8D2', 
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    compositionDetail: {
        fontSize: 20,
        color:  '#4FA8D2', 
    },
  })