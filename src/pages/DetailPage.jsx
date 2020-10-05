import React, { Component } from "react";
import * as db from "../database/db";
import Header from "../component/Header";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Ov from "../component/Details/Overview";
import Rv from "../component/Details/Reviews";
import { Container, Col, Badge } from "react-bootstrap";
import styles from './Details.module.css'

export default class DetailPage extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props)
    let myId;
    try {
      myId = this.props.location.state.id;
    } catch {
      myId = localStorage.getItem("pageid");
    }
    console.log(myId);
    if (!myId || !this.props.location.state) {
      // this.props.history.replace("/");
      return;
    } else {
      db.getMovieDetails(myId).then((res) => this.setState({ ...res }));
    }

    this.setState({ ["style"]: "danger" })
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        <Header
          img={
            this.state.backdrop_path &&
            `https://image.tmdb.org/t/p/w1280/${this.state.backdrop_path}`
          }
        />
        <Container>
          <Col md={12} className={styles.subs}>
            <Link to={`/detail/${localStorage.getItem("pageid")}/overview`}>
              <Badge pill variant={this.state.style}>
                Overview
              </Badge>
            </Link>

            <Link to={`/detail/${localStorage.getItem("pageid")}/character`}>
              <Badge pill variant={this.state.style}>
                Character
              </Badge>
            </Link>

            <Link to={`/detail/${localStorage.getItem("pageid")}/review`}>
              <Badge pill variant={this.state.style}>
                Review
              </Badge>
            </Link>
          </Col>

          <Switch>
            <Route
              path={`/detail/${localStorage.getItem("pageid")}/overview`}
              exact
            >
              <Ov {...this.state} />
            </Route>
            <Route
              path={`/detail/${localStorage.getItem("pageid")}/review`}
              component={Rv}
            />
            <Route render={() => "404"} />
          </Switch>
        </Container>
      </>
    );
  }
}
