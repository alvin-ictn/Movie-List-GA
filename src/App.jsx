import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import '.'
import Dm from './component/dummy'
import DetailPage from './pages/DetailPage'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    movie :[]
  }
  
  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/Le-Movie/detail/:movieid" component={DetailPage} />
            <Route path="/" component={Dm} />
            <Route render={() => "404"} />
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
