import axios from 'axios'

const configuration = {
  https : true,
  url : "https://warm-bastion-18573.herokuapp.com",
  endpointGet : {
    //user
    userDetail : "user",
    allRegisterUser : "user/alluser"
  },
  endpointPost : {
    // auth
    register : "register",
    login : "login",
  }
}
const apiurl = "https://warm-bastion-18573.herokuapp.com";

const discoverMovie = (page = 1) => {
  return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&include_video=false&page=${page}`)
  .then(res => res.data)
}

const getMovieDetails = (movieId = 557) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then(res => res.data)
}

const searchMovie = (lang="en-US", query="spiderman") => {
  return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}&query=${query}`)
  .then(res => res.data)
}

const getMovieCast = (id=557) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then(res => res.data)
}

const getCastDetails = (lang="en-US",id=2219) => {
  return axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${lang}`)
  .then(res => res.data)
}

const userLogin = (username,password) => {
  
}

export {
  getMovieDetails,
  searchMovie,
  discoverMovie,
  getMovieCast,
  getCastDetails,
  userLogin
}