import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Header from './component/Header'
import '.'
// import Ov from './component/Details/Overview'
// import Rv from './component/Details/Reviews'
import Dm from './component/dummy'
import DetailPage from './pages/DetailPage'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  state = {
    movie :[]
  }
  
  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
   
          {/* Detail Page: nampilin detail dari tv seriesnya */}
          <Route path="/detail/:movieid" component={DetailPage} />
          <Route path="/" component={Dm} />
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
