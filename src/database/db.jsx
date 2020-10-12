import axios from "axios";

const configuration = {
  https: true,
  url: "https://warm-bastion-18573.herokuapp.com",
  endpoint: {
    // user
    user: {
      self: "/user", // [GET] user detail or [DELETE] user
      edit: "/user/edit", // [PUT] edit user
      alluser: "/user/alluser", // [GET] all user
      register: "/register", // [POST] userregister
      login: "/login", // [POST] user login
    },

    // movie
    movie: {
      search: {
        title: "/titlesearch", // [GET] movie by title search
        categorysearch: "/categorysearch", // [GET] movie by category search
      },
      pagedmovie: "/movie", // [GET] build-in paged movie or [DELETE] movie
      add: "/movie/addMovie", // [POST] add movie
      edit: "/movie/editMovie", // [PUT] edit Movie
      editGet: "/movie/editMovie", // [GET] edit Movie??
      delete: "/movie/", // [DELETE] movie
    },

    //review
    review: {
      self: "/review/", // [GET] all user review
    },
  },
};

const user = (method, content = null, token = null) => {
  // get method
  if (method === "detail") {
    return axios.get(
      `${configuration.url}${configuration.endpoint.user.self}`,
      {
        headers: {
          token
        }
      }
    );
  }

  if (method === "getuser") {
    return axios
      .get(
        `${configuration.url}${configuration.endpoint.user.edit}`,
        {
          headers: {
            token
          }
        }
      )
      .then(res => res)
      .catch(err => err.response);
  }

  if (method === "alluser") {
    return axios.get(
      `${configuration.url}${configuration.endpoint.user.alluser}`,
      {
        headers: {
          ...token,
        },
      }
    );
  }

  // post method
  if (method === "register") {
    return axios
      .post(`${configuration.url}${configuration.endpoint.user.register}`, content)
      .then(res => res)
      .catch(err => err.response)
  }

  if (method === "login") {
    return axios
      .post(`${configuration.url}${configuration.endpoint.user.login}`, content)
      .then((res) => res)
      .catch((err) => err.response
      );
  }

  // delete method
  if (method === "delete") {
    return axios.delete(
      `${configuration.url}${configuration.endpoint.user.self}`,
      {
        headers: {
          ...token,
        },
      }
    );
  }

  // update method
  if (method === "edit") {
    return axios
      .put(
        `${configuration.url}${configuration.endpoint.user.edit}`,
        content,
        {
          headers: {
            ...token,
          },
        }
      )
      .catch((err) => {
        console.error(err);
      });
  }
};

const discoverMovie = (page = 1) => {
  return axios
    .get(
      `${configuration.url}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}`
    )
    .then((res) => res.data);
};

const getMovieDetails = (movieId = 557) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    .then((res) => res.data);
};

const searchMovie = (lang = "en-US", query = "spiderman") => {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&query=${query}`
    )
    .then((res) => res.data);
};

const getMovieCast = (id = 557) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
    .then((res) => res.data);
};

const getCastDetails = (lang = "en-US", id = 2219) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`
    )
    .then((res) => res.data);
};

const userLogin = (username, password) => {};

export {
  user,
  getMovieDetails,
  searchMovie,
  discoverMovie,
  getMovieCast,
  getCastDetails,
  userLogin,
};
