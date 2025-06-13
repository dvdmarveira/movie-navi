import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/googleBooksApi";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="film" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSearch = useCallback(async () => {
    if (searchText.trim() === "") {
      Alert.alert("Atenção", "Por favor, digite um termo para buscar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedMovies = await searchMovies(searchText);
      setMovies(fetchedMovies);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao buscar os filmes.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  const handleMoviePress = (movie) => {
    navigation.navigate("MovieDetail", { movie });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSearchSubmit={handleSearch}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Buscando filmes...</Text>
        </View>
      )}

      {error && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading &&
        !error &&
        movies.length === 0 &&
        searchText.trim() !== "" && (
          <View style={styles.messageContainer}>
            <Text style={styles.noResultsText}>
              Nenhum filme encontrado para "{searchText}".
            </Text>
          </View>
        )}

      {!loading && !error && movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={handleMoviePress} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {!loading &&
        !error &&
        movies.length === 0 &&
        searchText.trim() === "" && (
          <View style={styles.initialMessageContainer}>
            <Ionicons name="film-outline" size={80} color="#ccc" />
            <Text style={styles.initialMessageText}>
              Pesquise por filmes e encontre seu próximo filme favorito!
            </Text>
          </View>
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
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noResultsText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 10,
  },
  initialMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  initialMessageText: {
    marginTop: 20,
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    lineHeight: 25,
  },
});

export default SearchScreen;
