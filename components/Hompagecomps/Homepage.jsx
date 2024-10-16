import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IdContext } from '../../Context/IdContext';

export const HomePage = () => {
    const { userId } = React.useContext(IdContext);
    const navigation = useNavigation();
    const [plants, setPlants] = useState([]);

    //const fetchData = async () => {
    //     try {
    //      const response = await fetch('https://api.example.com/plants', { // Aquí iría la URL de tu API
    //           method: 'GET',
    //           headers: {
    //               'Content-Type': 'application/json',
    //           },
    //          body: JSON.stringify({ IdUsuario: userId })
    //     });
    //    const data = await response.json();
    //    setPlants(data); // Guardamos los datos obtenidos en el estado
    //  } catch (error) {
    //     console.error(error);
    // }
    //};
    const examplePlant = [
        {
            name: "Epipremnum aureum",
            species: "Pothos",
            status: "Sano"
        },
        {
            name: "Sansevieria trifasciata",
            species: "Lengua de tigre",
            status: "Necesita agua"
        }
    ];

    useEffect(() => {
        // Para probar cómo se ven las tarjetas de plantas
        setPlants(examplePlant);
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
