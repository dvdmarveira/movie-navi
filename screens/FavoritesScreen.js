import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MovieCard from "../components/MovieCard";
import { getFavoriteMovies } from "../services/storageService";

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const movies = await getFavoriteMovies();
      setFavoriteMovies(movies);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao carregar os favoritos.");
      setFavoriteMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleMoviePress = (movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      )}
      {error && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {!loading && !error && favoriteMovies.length === 0 && (
        <View style={styles.messageContainer}>
          <Text style={styles.noFavoritesText}>
            Você ainda não adicionou filmes aos favoritos.
          </Text>
          <Text style={styles.noFavoritesText}>
            Use a busca para encontrar filmes e adicioná-los!
          </Text>
        </View>
      )}
      {!loading && !error && favoriteMovies.length > 0 && (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={handleMoviePress} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noFavoritesText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 10,
  },
});

export default FavoritesScreen;
