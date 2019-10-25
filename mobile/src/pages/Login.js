import React, { useState, useEffect } from 'react';
// KeyboardAvoidingView behavior="padding" é para o teclado ficar em baixo dos inputs
// AsyncStorage é um banco sqlite
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        //se existir alguma coisa na variavel user irei navegar para o List
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);
        
        //o List precisa esta cadastrado em nossas rotas
        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />
            {/* o formulario vai ser como se fosse outra view */}
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    //para vir o @ ...
                    keyboardType="email-address"
                    // para não colocar nenhuma letra caixa alta
                    autoCapitalize="none"
                    // para não tentar corrigr o email digitado
                    autoCorrect={false}
                    value={email}
                    // recebemos o texto que o usuario digitou dentro do input
                    onChangeText={setEmail}
                />

            <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    //words cada palavra ele coloca em caixa alta a primeira letra
                    autoCapitalize="words"
                    // para não tentar corrigr o email digitado
                    autoCorrect={false}
                    value={techs}
                    // recebemos o texto que o usuario digitou dentro do input
                    onChangeText={setTechs}
                />

                {/* aqui as tags não herdam os css */}
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

// não consigo estilizar uma label que esta dentro do container por exemplo. Não existe 
// encadiamento de css.
// todo elemento tem um id unico

const styles = StyleSheet.create({
    container: {
        //ocupar todo o tamanho da tela
        flex: 1,
        //alinhar o conteudo verticalmente ao centro
        justifyContent: 'center',
        //alinhar horizontalmente ao centro
        alignItems: 'center'
    },
    
    form: {
        //quero que ele ocupe a largura inteira possivel
        alignSelf: 'stretch',
        //só nas horizontais
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        //negrito
        fontWeight: 'bold',
        color: '#444',
        //para distanciar essa label
        marginBottom: 8,
    },

    input: {
        //tamanho da borda
        borderWidth: 1,
        //cor da borda
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});