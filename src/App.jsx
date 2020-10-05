import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Header from './component/Header'
import '.'
import * as db from './database/db'
// import Ov from './component/Details/Overview'
// import Rv from './component/Details/Reviews'
import Dm from './component/dummy'
import DetailPage from './pages/DetailPage'
import Dum from './component/dummy2'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  state = {
    movie :[]
  }
  // componentDidMount(){
  //   // db.getMovieDetails().then(res => console.log(res))
  //   db.discoverMovie().then(res => console.log(res))
  // }
  handleA = e => {
    console.log(db.getMovieDetails())
  }
  render(){
    return (
      <div className="App">
        {/* <Dum/> */}
        <Router>
          <Switch>
          <Route path="/" component={Dm} exact />
          {/* Detail Page: nampilin detail dari tv seriesnya */}
          <Route path="/detail" component={DetailPage} />

          {/* 404 Page */}
          <Route render={() => "404"} />
          </Switch>
        </Router>

        {/* <Ov/>
        <Rv/> */}
      </div>
    );
  }
  
}

export default App;
