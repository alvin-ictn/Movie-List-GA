import React, { Component } from "react";
import * as db from "../database/db";
import Header from '../component/Header'

export default class DetailPage extends Component {
  state = {}
  componentDidMount() {
    if (!this.props.location.state.id || !this.props.location.state) {
      this.props.history.replace("/");
      return;
    } else {
      db.getMovieDetails(this.props.location.state.id).then(res => this.setState({...res}))
    }
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  render() {
    return <div><Header img={this.state.backdrop_path && `https://image.tmdb.org/t/p/w1280/${this.state.backdrop_path}`}/></div>;
  }
}
