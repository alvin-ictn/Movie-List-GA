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
}

const movie = (method, content = null, token = null) => {
  // get method
  if (method === "detail") {
    return axios.get(
      `${configuration.url}`
    ).then(res => res)
  }

  if (method === "search") {
    return axios.get(
      `${configuration.url}${configuration.endpoint.movie.search.title}?title=${content}`
    ).then(res => res)
  }
}

const review = (method, content = null, token = null, query = null) => {
  // get method
  if (method === "get") {
    return axios.get(
      `${configuration.url}${configuration.endpoint.review.self}`,
      {
        headers: {
          ...token,
        },
      }
    ).then(res => res)
  }

  if(method === "all") {
    return axios.get(
      `${configuration.url}${configuration.endpoint.review.self}/allreviews`,
      {
        headers: {
          ...token,
        },
      }
    ).then(res => res)
  }

  if (method === "post") {
    return axios.get(
      `${configuration.url}${configuration.endpoint.movie.search.title}?Id=${query}`,content,
      {
        headers: {
          ...token,
        },
      }
    ).then(res => res)
  }
}


export {
  user,
  movie,
  review
};
