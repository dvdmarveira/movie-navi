import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import FavoriteButton from "../components/FavoriteButton";
import {
  saveMovie,
  removeMovie,
  isMovieFavorite,
} from "../services/storageService";

const MovieDetailScreen = () => {
  const route = useRoute();
  const { movie } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    setLoadingFavorite(true);
    try {
      const status = await isMovieFavorite(movie.id);
      setIsFavorite(status);
    } catch (error) {
      console.error("Erro ao verificar status do favorito:", error);
    } finally {
      setLoadingFavorite(false);
    }
  }, [movie.id]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const handleToggleFavorite = async () => {
    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await removeMovie(movie.id);
        Alert.alert("Sucesso", "Filme removido dos favoritos!");
      } else {
        await saveMovie(movie);
        Alert.alert("Sucesso", "Filme adicionado aos favoritos!");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      Alert.alert(
        "Erro",
        error.message || "Ocorreu um erro ao salvar/remover o filme."
      );
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.poster}
          source={{ uri: movie.posterPath }}
          resizeMode="contain"
        />
        {loadingFavorite ? (
          <ActivityIndicator
            size="small"
            color="#6200EE"
            style={styles.favoriteLoading}
          />
        ) : (
          <FavoriteButton
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.originalTitle}>{movie.originalTitle}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Data de Lançamento:</Text>
          <Text style={styles.value}>{movie.releaseDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Avaliação:</Text>
          <Text style={styles.value}>⭐ {movie.voteAverage}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Sinopse:</Text>
        <Text style={styles.description}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  poster: {
    width: 250,
    height: 375,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  favoriteLoading: {
    position: "absolute",
    top: 25,
    right: 25,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  originalTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#777",
    flexShrink: 1,
    textAlign: "right",
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    textAlign: "justify",
  },
});

export default MovieDetailScreen;
