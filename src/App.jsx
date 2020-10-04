import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './component/Header'
import '.'
import * as db from './database/db'
import Ov from './component/Details/Overview'
import Rv from './component/Details/Reviews'

class App extends React.Component {
  state = {
    movie :[]
  }
  componentDidMount(){
    db.getMovieDetails().then(res => console.log(res))
  }
  handleA = e => {
    console.log(db.getMovieDetails())
  }
  render(){
    return (
      <div className="App">
        <Header/>
        <Ov/>
        <Rv/>
      </div>
    );
  }
  
}

export default App;
