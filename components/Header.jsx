import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header () {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Comidas salvadoreñas</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#08358aff',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 50,
        paddingBottom: 25,
        elevation: 10,
    },
    headerTitle: {
        fontFamily: 'Arial',
        color: 'white',
        fontSize: 25,
        fontWeight: '700',
    }
})
