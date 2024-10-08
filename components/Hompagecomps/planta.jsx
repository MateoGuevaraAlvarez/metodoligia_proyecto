import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export const Planta = () => {
    return (
        <View style={styles.container}>

            {/* Información de la planta */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Planta 1</Text>
                <Text style={styles.subTitle}>Especie: Especie 1</Text>
                <Text style={styles.status}>Estado: En crecimiento</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subTitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        color: '#888',
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});
