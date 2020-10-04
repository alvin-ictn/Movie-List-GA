import React, { Component } from 'react'
import * as db from '../database/db'
import Header from '../component/Header'
export default class dummy extends Component {
  state = {
    results : [],
    page : 0,
    total_page : 0,
    total_results : 0,
  }

  componentDidMount(){
    db.discoverMovie().then(res => this.setState({...res}))
  }

  componentDidUpdate(){
    console.log(this.state)
  }

  onClickDetail = (id) => {
    this.props.history.push({
      pathname: `/detail/${id}/overview`,
      state: { id }
    })
    localStorage.setItem('pageid', id)
  }
  render() {
    return (
      <div>
                <Header/>
        {this.state.results.map(item => (
          <img onClick={()=> this.onClickDetail(item.id)} id={item.id} key={item.id} src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`} alt={item.original_title}/>
        ))}
      </div>
    )
  }
}
