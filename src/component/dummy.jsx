import React, { Component } from "react";
import Header from "./Header";
import { movie } from "../database/db";
import { Container, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import "./MovieCard.css";
export default class dummy extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    movie("detail").then((res) => {
      let results = [...res.data];
      this.setState({ results });
    });
  }

  componentDidUpdate() {}

  onClickDetail = (id) => {
    this.props.history.push({
      pathname: `/Le-Movie/detail/${id}/overview/`,
      state: { id },
    });
    localStorage.setItem("pageid", id);
  };

  handleImage = (e) => {
    e.target.src = `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"500"%20height%3D"750"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2050%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"50"%20height%3D"75"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"6"%20y%3D"45">Poster<%2Ftext><%2Fg><%2Fg><%2Fsvg>`;
  };
  render() {
    return (
      <div>
        <Header img={this.state.results[0] && this.state.results[0].backdrop} />
        <Container>
          {this.state.results.map((item) => (
            <Card
              className="m-3 movieList"
              key={item.id}
              style={{
                display: "inline-block",
                width: "150px",
                height: "225px",
                verticalAlign: "top",
              }}
            >
              <img
                style={{ width: "150px", height: "225px" }}
                width={150}
                height={225}
                id={item.id}
                src={
                  item.poster.match(/^(http|https):/)
                    ? `${item.poster}`
                    : item.poster.length !== 18
                    ? `https://warm-bastion-18573.herokuapp.com${item.poster}`
                    : `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"500"%20height%3D"750"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2050%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"50"%20height%3D"75"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"6"%20y%3D"45">Poster<%2Ftext><%2Fg><%2Fg><%2Fsvg>`
                }
                alt={`poster`}
                onError={(e) => this.handleImage(e)}
              />
              <div className="overlay">
                <label className="text-light text-center">{item.title}</label>
                <button onClick={() => this.onClickDetail(item.title)} className="watchButton p-2">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 320.001 320.001"
                    style={{
                      width: "50px",
                      height: "50px",
                      fill: "white",
                      position: "relative",
                      left: "5px",
                    }}
                  >
                    <path
                      d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
                    c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
                    c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"
                    />
                  </svg>
                </button>
                <div>
                  {item.category.indexOf(",") && item.category.includes(",")
                    ? item.category.split(",").map((data, key) => (
                        <div key={key} className="badge badge-primary mx-2">
                          {data}
                        </div>
                      ))
                    : item.category.split(" ").map((data, key) => (
                        <div key={key} className="badge badge-primary mx-2">
                          {data}
                        </div>
                      ))}
                </div>
                <div className="badge badge-primary"></div>
                <div className="bottom--panel">
                  <ReactStars
                    count={5}
                    value={item.rating / 2}
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                  />
                </div>
              </div>
            </Card>
          ))}
        </Container>
        {this.state.results.map(item => <p>{item.trailer}</p>)}
      </div>
    );
  }
}
