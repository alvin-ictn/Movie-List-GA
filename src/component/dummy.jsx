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
            src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}
            alt={item.original_title}
          />
        ))}
      </div>
    );
  }
}
