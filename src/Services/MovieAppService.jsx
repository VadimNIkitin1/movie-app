export default class MovieAppService {
  _apiKey = 'ebebeaa17b7c4f315cf80a57a9cfea40';

  _apiBase = `https://api.themoviedb.org/3`;

  _apiMovies = `${this._apiBase}/search/movie?api_key=${this._apiKey}`;

  _apiGenre = `${this._apiBase}/genre/movie/list?api_key=${this._apiKey}&language=en-US`;

  _apiImg = 'https://image.tmdb.org/t/p/w500';

  _genres = undefined;

  _apiGuestSession = `${this._apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`;

  async requestResource(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Could not request ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllMovies(query, page = 1) {
    const res = await this.requestResource(`${this._apiMovies}&query=${query}&page=${page}`);
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
        voteAverage: elem.vote_average,
      });
    });
    return {
      movies,
      totalPages: res.total_pages,
    };
  }

  async getRatedMovies() {
    const obj = localStorage.getItem('id');
    const res = await this.requestResource(
      `${this._apiBase}/guest_session/${obj}/rated/movies?api_key=${this._apiKey}`
    );
    return res;
  }

  async getGenres() {
    const res = await this.requestResource(this._apiGenre);
    return res.genres;
  }

  async getSessionId() {
    const res = await this.requestResource(this._apiGuestSession);
    return res.guest_session_id;
  }

  getGenreNames(ids) {
    return ids.map((id) => this.getGenreName(id));
  }

  getGenreName(id) {
    return this._genres.filter((genre) => genre.id === id)[0].name;
  }

  async addRate(id, value) {
    const res = await this.requestResource(
      `${this._apiBase}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${localStorage.getItem('id')}`,
      {
        method: 'POST',
        body: JSON.stringify({ value }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );
    return res;
  }

  async deleteRate(id) {
    const res = await this.requestResource(
      `${this._apiBase}/movie/${id}/rating?guest_session_id=${localStorage.getItem('id')}&api_key=${this._apiKey}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );
    return res;
  }
}
