import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IdContext } from '../../Context/IdContext';
import { set } from 'date-fns';

export const HomePage = () => {
    const { userId } = React.useContext(IdContext);
    const navigation = useNavigation();
    const [plants, setPlants] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://10.2.66.154:8080/plants', { // Aquí iría la URL de tu API
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'user_id': userId.toString(),
                },
            });
            const data = await response.json();
            console.log (data);
            setPlants(data); // Guardamos los datos obtenidos en el estado
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        //implementacion websocket para actualizacion en tiempo real, no se si va a pasar
    //    const socket = new WebSocket('ws://http://10.2.66.154:8080/plants');
    //    socket.onmessage = (event) => {
    //        const updatedPlants = JSON.parse(event.data);
    //        setPlants(updatedPlants);
    //    }
    //    socket.onerror = (error) => {
    //        console.error(error);
    //    }
    //    return () => {
    //        socket.close();
    //    };
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {plants.length > 0 ? (
                plants.map((plant, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.text}>Nombre: {plant.name}</Text>
                        <Text style={styles.text}>Especie: {plant.species}</Text>
                        <Text style={styles.text}>Estado: {plant.status}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.text}>Cargando plantas...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        height: 100,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    text: {
        fontSize: 15,
        color: '#333',
    },
});
