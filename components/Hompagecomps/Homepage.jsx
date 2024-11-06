import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IdContext } from '../../Context/IdContext';
import { format, isAfter, parseISO } from 'date-fns';

export const HomePage = () => {
    const { userId } = React.useContext(IdContext);
    const navigation = useNavigation();
    const [latestPlant, setLatestPlant] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const alertOpacity = useRef(new Animated.Value(0)).current;

    const fetchData = async () => {
        try {
            const response = await fetch('http://grillos.synology.me:8080/data/1', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            
            const mostRecentPlant = data.reduce((latest, plant) => {
                const plantDate = parseISO(plant.timestamp);
                return isAfter(plantDate, parseISO(latest.timestamp)) ? plant : latest;
            }, data[0]);

            setLatestPlant(mostRecentPlant);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAlert = async () => {
        try {
            const response = await fetch('http://grillos.synology.me:8080/getalert', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'user_id': userId.toString(),
                },
            });
            const data = await response.json();
            console.log(data)
            if (response.ok && data!= '') {  
                setAlertMessage(data.message);
                setAlertVisible(true);
                
                // Mostrar la alerta con animación
                Animated.timing(alertOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();

                // Ocultar la alerta después de 3 segundos
                setTimeout(() => {
                    Animated.timing(alertOpacity, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start(() => setAlertVisible(false));
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
            fetchAlert();
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {alertVisible && (
                <Animated.View style={[styles.alertBox, { opacity: alertOpacity }]}>
                    <Text style={styles.alertText}>{alertMessage}</Text>
                </Animated.View>
            )}
            <Text style={styles.title}>🌱 Datos de la Planta</Text>
            {latestPlant ? (
                <View style={styles.card}>
                    <Text style={styles.text}>Nombre: Epipremnum aureum</Text>
                    <Text style={styles.text}>🆔 Id: {latestPlant.plant_id}</Text>
                    <Text style={styles.text}>💧 Humedad: {latestPlant.soil_humidity}%</Text>
                    <Text style={styles.text}>🌡️ Temperatura: {latestPlant.temperature}°C</Text>
                    <Text style={styles.text}>☀️ Luz: {latestPlant.light_level} lux</Text>
                    <Text style={styles.text}>⏰ Última actualización: {format(parseISO(latestPlant.timestamp), 'dd/MM/yyyy HH:mm:ss')}</Text>
                </View>
            ) : (
                <Text style={styles.loadingText}>Cargando planta más reciente...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        backgroundColor: '#f0f4f8',
    },
    alertBox: {
        position: 'absolute',
        top: 20,
        width: 400,
        padding: 10,
        backgroundColor: '#ffdd57',
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    alertText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#000000",
        marginBottom: 20,
    },
    card: {
        width: 300,
        padding: 20,
        borderRadius: 8,
        backgroundColor: "#ffffff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        alignItems: "flex-start",
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    loadingText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});
