import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const FavoriteButton = ({ isFavorite, onToggleFavorite }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onToggleFavorite}>
      {/* Usa um ícone de estrela preenchida se for favorito, ou contorno se não for */}
      <Ionicons
        name={isFavorite ? 'star' : 'star-outline'} 
        size={30}
        color={isFavorite ? '#FFD700' : '#888'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default FavoriteButton;
