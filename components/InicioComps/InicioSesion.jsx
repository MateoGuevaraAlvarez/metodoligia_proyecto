import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,TextInput,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IdContext } from '../../Context/IdContext';

export const InicioSesion = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId } = React.useContext(IdContext);
    const handleLoginPress = async () => {
        // manejo de login
        console.log('Usuario:', user);
        console.log('Contraseña:', password);
        try {
            const response = await fetch('https://api.example.com/login', { // Aquí iría la URL de tu API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Usuario: user, Contraseña: password}),
            });
            const data = await response.json();
            console.log(data);
            setUserId(data.id); 
        }
        catch (error) {
            console.error(error);
        }
        // Redirigir a la pantalla de homepage
        navigation.navigate('HomePage');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.text}>Usuario:</Text>
            <TextInput
                style={styles.input}
                placeholder="Introduce tu usuario"
                onChangeText={(text) => setUser(text)}
            />
            <Text style={styles.text}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                placeholder="Introduce tu contraseña"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Button title="Iniciar Sesión" onPress={handleLoginPress} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});