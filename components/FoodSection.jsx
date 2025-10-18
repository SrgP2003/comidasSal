
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllComidas } from '../apiComidasSal';

export default function FoodSection({ title = 'Sección', category = '' }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoading(true);
                const data = await getAllComidas();
                if (!mounted) return;
                // Filtrar por categoría 
                const filtered = (data || []).filter((d) => {
                    const cat = (d.category || d.categoria || '').toString().toLowerCase();
                    return cat === (category || '').toString().toLowerCase();
                });
                setItems(filtered);
            } catch (err) {
                if (!mounted) return;
                setError(err.message || String(err));
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [category]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.name}>{item.name|| 'Sin nombre'}</Text>
            {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
            {item.ingredients ? <Text style={styles.meta}>Ingredientes: {item.ingredients}</Text> : null}
            {item.preparation_time != null ? (
                <Text style={styles.meta}>Tiempo: {item.preparation_time} min</Text>
            ) : null}
            {item.nutricional_value ? <Text style={styles.meta}>{item.nutricional_value}</Text> : null}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {loading ? (
                <ActivityIndicator size="small" />
            ) : error ? (
                <Text style={styles.error}>Error: {error}</Text>
            ) : items.length === 0 ? (
                <Text style={styles.empty}>No hay elementos en esta categoría.</Text>
            ) : (
                <FlatList
                    data={items}
                    scrollEnabled={false}
                    keyExtractor={(it) => String(it.id)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 8 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        width: '100%',
    },
    title: {
        color: '#145ce0ff',
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 6,
        paddingHorizontal: 12,
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 30,
        borderWidth: 0.5,
        margin: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
    desc: {
        marginTop: 4,
        color: '#444',
        textAlign: 'center'
    },
    meta: {
        marginTop: 4,
        color: '#666',
        fontSize: 12,
        textAlign: 'center'
    },
    error: {
        color: 'red',
        paddingHorizontal: 12
    },
    empty: {
        color: '#666',
        paddingHorizontal: 12
    }
});