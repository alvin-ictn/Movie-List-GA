import React, { Component } from "react";
import * as db from "../database/db";
import Header from "./Header";

import { Pagination } from "react-bootstrap";
export default class dummy extends Component {
  state = {
    results: [],
    page: 0,
    total_page: 0,
    total_results: 0,
  };

  componentDidMount() {
    db.discoverMovie().then((res) => this.setState({ ...res }));
    // this.pagination()
    this.state.result || this.setState({results:[
      {
        id: 12,
        original_title : "A",
        poster_path : "../images/poster.jpg"
      },
      {
        id: 13,
        original_title : "B",
        poster_path : "../images/poster.jpg"
      },
      {
        id: 14,
        original_title : "C",
        poster_path : "../images/poster.jpg"
      },
      {
        id: 15,
        original_title : "D",
        poster_path : "../images/poster.jpg"
      },
      {
        id: 16,
        original_title : "E",
        poster_path : "../images/poster.jpg"
      },
      {
        id: 17,
        original_title : "F",
        poster_path : "../images/poster.jpg"
      },
    ]})
  }

  componentDidUpdate() {
    
    
    console.log("step1 get discover data", this.state);
  }
   onClickDetail = (id) => {
    this.props.history.push({
      pathname: `/detail/${id}/overview`,
      state: { id },
    });
    localStorage.setItem("pageid", id);
  };

  // pagination = (index = 1) => {
  //   let data = index.target ? index.target.innerHTML : index.target
  //   let active = Number(data) || index;
  //   let items = [];
  //   for (let number = 1; number <= 5; number++) {
  //     items.push(
  //       <Pagination.Item key={number} active={number === active}>
  //         {number}
  //       </Pagination.Item>
  //     );
  //     db.discoverMovie(Number(data)).then((res) => this.setState({ ...res }));
  //   }
  //   this.setState({["pagenumbah"]:items})
  // };

  render() {
    return (
      <div>
        {/* <Pagination onClick={(e)=>this.pagination(e)}>{this.state.pagenumbah}</Pagination> */}
        <Header />
        {this.state.results.map((item) => (
          <img
            onClick={() => this.onClickDetail(item.id)}
            id={item.id}
            key={item.id}
            src={item.poster_path.length ? `https://image.tmdb.org/t/p/w92/${item.poster_path}` : `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"500"%20height%3D"750"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2050%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"50"%20height%3D"75"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"6"%20y%3D"45">Poster<%2Ftext><%2Fg><%2Fg><%2Fsvg>`}
            alt={item.original_title}
          />
        ))}
      </div>
    );
  }
}
