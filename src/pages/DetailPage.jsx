import React, { Component } from "react";
import * as db from "../database/db";
import Header from "../component/Header";
import { Route, Switch, Link } from "react-router-dom";
import Ov from "../component/Details/Overview";
import Rv from "../component/Details/Reviews";
import Cr from '../component/Details/Characters'
import { Container, Col, Badge } from "react-bootstrap";
import styles from './Details.module.css'

export default class DetailPage extends Component {
  state = {};
  componentDidMount() {
    // console.log(this.props)
    let myId;
    try {
      myId = this.props.location.state.id;
    } catch {
      myId = localStorage.getItem("pageid");
    }
    
    if (!myId || !this.props.location.state) {
      // this.props.history.replace("/");
      return;
    } else {
      db.getMovieDetails(myId).then((res) => this.setState({ ...res }));
    }

    this.setState({ "styleButton": "danger" })
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        {this.state.backdrop_path ? <Header
          img={
            this.state.backdrop_path &&
            `https://image.tmdb.org/t/p/w1280/${this.state.backdrop_path}`
          }
        /> : <Header
        img={
          `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"1280"%20height%3D"720"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20128%2072"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"128"%20height%3D"72"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"38"%20y%3D"40">Backdrop<%2Ftext><%2Fg><%2Fg><%2Fsvg>`
        }
      />}
        
        <Container>
          <Col md={12} className={styles.subs}>
            <Link to={`/detail/${this.props.match.params.movieid}/overview`}>
              <Badge pill variant={this.state.styleButton}>
                Overview
              </Badge>
            </Link>

            <Link to={`/detail/${this.props.match.params.movieid}/character`}>
              <Badge pill variant={this.state.styleButton}>
                Character
              </Badge>
            </Link>

            <Link to={`/detail/${this.props.match.params.movieid}/review`}>
              <Badge pill variant={this.state.styleButton}>
                Review
              </Badge>
            </Link>
          </Col>

          <Switch>
            <Route
              path={`/detail/:id/overview`}
              exact
            >
              <Ov {...this.state} />
            </Route>
            <Route
              path={`/detail/:id/review`}
              component={Rv}
            />
            <Route
              path={`/detail/:id/character`}
              component={Cr}
            />
            <Route render={() => "404"} />
          </Switch>
        </Container>
      </>
    );
  }
}
