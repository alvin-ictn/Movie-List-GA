import React, { Component } from "react";
import { movie } from "../database/db";
import Header from "../component/Header";
import { Route, Switch, Link } from "react-router-dom";
import Overview from "../component/Details/Overview";
import Review from "../component/Details/Reviews";
import { Container, Col, Badge } from "react-bootstrap";
import styles from './Details.module.css'

export default class DetailPage extends Component {
  state = {
    query : window.location.href.split('/'),
    styleButton : "danger"
  };

  componentDidMount() {
    movie("search",this.state.query[this.state.query.length - 2])
      .then(res => this.setState({...this.state, 
        data : res.data[0]
      }))
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <>

        {this.state.data ? <Header
          img={this.state.data.backdrop}
        /> : <Header
        img={
          `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"1280"%20height%3D"720"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20128%2072"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"128"%20height%3D"72"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"38"%20y%3D"40">Backdrop<%2Ftext><%2Fg><%2Fg><%2Fsvg>`
        }
      />}
        
        <Container>
          <Col md={12} className={styles.subs}>
            <Link to={`/Le-Movie/detail/${this.props.match.params.movieid}/overview`}>
              <Badge pill variant={this.state.styleButton}>
                Overview
              </Badge>
            </Link>

            <Link to={`/Le-Movie/detail/${this.props.match.params.movieid}/review`}>
              <Badge pill variant={this.state.styleButton}>
                Review
              </Badge>
            </Link>
          </Col>

          <Switch>
            <Route
              path={`/Le-Movie/detail/:id/overview`}
              exact
            >
              <Overview {...this.state} />
            </Route>
            <Route
              path={`/Le-Movie/detail/:id/review`}
              component={Review}
            />
            <Route render={() => "404"} />
          </Switch>
        </Container>
      </>
    );
  }
}
