import React, { Component } from "react";
import * as db from "../database/db";
import Header from "../component/Header";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Ov from "../component/Details/Overview";
import Rv from "../component/Details/Reviews";
export default class DetailPage extends Component {
  state = {};
  componentDidMount() {
    let myId;
    try {
      myId = this.props.location.state.id;
    } catch {
      myId = localStorage.getItem("pageid");
    }
    console.log(myId);
    //this.props.location.state.id
    if (!myId || !this.props.location.state) {
      // this.props.history.replace("/");
      return;
    } else {
      db.getMovieDetails(myId).then((res) => this.setState({ ...res }));
    }
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Header
          img={
            this.state.backdrop_path &&
            `https://image.tmdb.org/t/p/w1280/${this.state.backdrop_path}`
          }
        />
        <Link to={`/detail/${localStorage.getItem("pageid")}/review`}>
          FORERS
        </Link>
        {"  "}
        <Link to={`/detail/${localStorage.getItem("pageid")}/overview`}>
          OVERR
        </Link>
        {"  "}
        <Link to={`/`}>BAC</Link>
        {"  "}
        <Switch>
          <Route
            path={`/detail/${localStorage.getItem("pageid")}/overview`}
            component={Ov}
            exact
          />
          <Route
            path={`/detail/${localStorage.getItem("pageid")}/review`}
            component={Rv}
          />
          <Route render={() => "404"} />
        </Switch>
      </div>
    );
  }
}
