export default class MovieAppService {
  _apiKey = 'ebebeaa17b7c4f315cf80a57a9cfea40';

  _apiBase = `https://api.themoviedb.org/3`;

  _apiMovies = `${this._apiBase}/search/movie?api_key=${this._apiKey}`;

  _apiGenre = `${this._apiBase}/genre/movie/list?api_key=${this._apiKey}&language=en-US`;

  _apiImg = 'https://image.tmdb.org/t/p/w500';

  _genres = undefined;

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  async getAllMovies(query, page = 1) {
    const res = await this.getResource(`${this._apiMovies}&query=${query}&page=${page}`);
    const movies = [];

    if (!this._genres) {
      this._genres = await this.getGenres();
    }

    res.results.forEach((elem) => {
      movies.push({
        id: elem.id,
        title: elem.original_title,
        release: elem.release_date ? new Date(elem.release_date) : null,
        overview: elem.overview,
        genre: this.getGenreNames(elem.genre_ids),
        imageURL: this._apiImg + elem.poster_path,
      });
    });
    return {
      movies,
      totalPages: res.total_pages,
    };
  }

  async getGenres() {
    const res = await this.getResource(this._apiGenre);
    return res.genres;
  }

  getGenreNames(ids) {
    return ids.map((id) => this.getGenreName(id));
  }

  getGenreName(id) {
    return this._genres.filter((genre) => genre.id === id)[0].name;
  }
}
