import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemonList(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonPress = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePokemonPress(item)}>
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#ff0000" /> : null}
      />
      
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPokemon && (
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedPokemon.sprites.front_default }} style={styles.imageLarge} />
              <Text style={styles.name}>{selectedPokemon.name}</Text>
              <Text style={styles.details}>Altura: {selectedPokemon.height}</Text>
              <Text style={styles.details}>Peso: {selectedPokemon.weight}</Text>
              <Text style={styles.details}>Habilidades: {selectedPokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 48, 199, 0.96)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageLarge: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  details: {
    fontSize: 20,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default PokemonList;
