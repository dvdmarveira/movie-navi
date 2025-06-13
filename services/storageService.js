import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_MOVIES_KEY = "@favoriteMovies";

/**
 * Salva um filme nos favoritos.
 * Se o filme já existe, ele não é adicionado novamente.
 * @param {Object} movie O objeto filme a ser salvo.
 * @returns {Promise<void>}
 */
export const saveMovie = async (movie) => {
  try {
    const currentMovies = await getFavoriteMovies();
    const isAlreadyFavorite = currentMovies.some(
      (favMovie) => favMovie.id === movie.id
    );

    if (!isAlreadyFavorite) {
      const updatedMovies = [...currentMovies, movie];
      await AsyncStorage.setItem(
        FAVORITE_MOVIES_KEY,
        JSON.stringify(updatedMovies)
      );
      console.log(`Filme '${movie.title}' salvo nos favoritos.`);
    } else {
      console.log(`Filme '${movie.title}' já está nos favoritos.`);
    }
  } catch (error) {
    console.error("Erro ao salvar filme:", error);
    throw new Error("Não foi possível salvar o filme nos favoritos.");
  }
};

/**
 * Remove um filme dos favoritos.
 * @param {string} movieId O ID do filme a ser removido.
 * @returns {Promise<void>}
 */
export const removeMovie = async (movieId) => {
  try {
    const currentMovies = await getFavoriteMovies();
    const updatedMovies = currentMovies.filter((movie) => movie.id !== movieId);
    await AsyncStorage.setItem(
      FAVORITE_MOVIES_KEY,
      JSON.stringify(updatedMovies)
    );
    console.log(`Filme com ID '${movieId}' removido dos favoritos.`);
  } catch (error) {
    console.error("Erro ao remover filme:", error);
    throw new Error("Não foi possível remover o filme dos favoritos.");
  }
};

/**
 * Obtém todos os filmes favoritos armazenados.
 * @returns {Promise<Array>}
 */
export const getFavoriteMovies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Erro ao obter filmes favoritos:", error);
    throw new Error("Não foi possível obter os filmes favoritos.");
  }
};

/**
 * Verifica se um filme está nos favoritos.
 * @param {string} movieId O ID do filme a ser verificado.
 * @returns {Promise<boolean>} Retorna true se o filme estiver nos favoritos, false caso contrário.
 */
export const isMovieFavorite = async (movieId) => {
  try {
    const favoriteMovies = await getFavoriteMovies();
    return favoriteMovies.some((movie) => movie.id === movieId);
  } catch (error) {
    console.error("Erro ao verificar se o filme é favorito:", error);
    return false;
  }
};
