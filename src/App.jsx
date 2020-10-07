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
import Circle from './component/reusable/CircleGenerator'


class App extends React.Component {
  state = {
    movie :[]
  }
  
  render(){
    return (
      <div className="App">
        {/* <Dum/> */}
        <Circle percentage={30} size={50} stroke={10}/>
        <Router>
          <Switch>
   
          {/* Detail Page: nampilin detail dari tv seriesnya */}
          <Route path="/detail/:movieid" component={DetailPage} />
          <Route path="/" component={Dm} />
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
