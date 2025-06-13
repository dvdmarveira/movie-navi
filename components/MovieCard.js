import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(movie)}>
      {/* Poster do filme */}
      <Image
        style={styles.poster}
        source={{ uri: movie.posterPath }}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        {/* Título do filme */}
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {/* Data de lançamento */}
        <Text style={styles.releaseDate} numberOfLines={1}>
          {movie.releaseDate}
        </Text>
        {/* Avaliação */}
        <Text style={styles.rating}>⭐ {movie.voteAverage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  releaseDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
  },
});

export default MovieCard;
