import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        //quando eu tiver o user_id
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.9:3333', {
                query: { user_id }
            })

            //toda vez que eu receber uma mensagem com booking_response irei exibir um alerta
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' }`)
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
 
            setTechs(techsArray);
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            {/* posso dizer que aqui faz referencia as tecnologias e irei fazer um loop */}
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    logo: {
        height: 32,
        // quero que o conteudo da imagem fique contido no espaço disponvel
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 25
    },
});