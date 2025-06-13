import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "YOUR_TMDB_API_KEY"; // Você precisará substituir isso pela sua chave de API do TMDB

/**
 * Busca filmes na API do TMDB com base em um termo de pesquisa.
 * @param {string} query O termo de pesquisa para os filmes.
 * @returns {Promise<Array>}
 */
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: "pt-BR",
        page: 1,
      },
    });

    if (response.data.results) {
      return response.data.results.map((item) => ({
        id: item.id,
        title: item.title,
        originalTitle: item.original_title,
        overview: item.overview || "Nenhuma descrição disponível.",
        releaseDate: item.release_date || "N/A",
        voteAverage: item.vote_average || "N/A",
        posterPath: item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : "https://placehold.co/500x750/cccccc/000000?text=Sem+Poster",
        backdropPath: item.backdrop_path
          ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
          : null,
        genreIds: item.genre_ids || [],
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw new Error(
      "Não foi possível buscar os filmes. Verifique sua conexão ou tente novamente mais tarde."
    );
  }
};
