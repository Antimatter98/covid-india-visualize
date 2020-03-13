import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import PieChart from './components/piechart';
import TableData from './components/table';

class App extends Component{
  state = {
    dataLoad: false,
    data: [],
    states: [],
    total: []
  };

  componentDidMount(){
    fetch('https://exec.clay.run/kunksed/mohfw-covid')
    .then(result => {
      return result.json();
    })
    .then((res) => {
      //console.log(res);
      //this.data = res;
      let states=[];
      let total = [];
      //console.log(res.stateData);
      for (var key in res.stateData) {
        var tmp = {state: key};
        for (var key1 in res.stateData[key]) {
          //console.log(key, key1, res.stateData[key][key1]);
          tmp[key1] = res.stateData[key][key1];
        }
        //console.log(tmp);
        states.push(tmp);
      }
      //console.log(states);

      total.push(res.countryData)
      //console.log(total);
      this.setState({dataLoad: true, data: [], states: states, total: total});
    })
    .catch(err => {
      console.log(err);
    });
  }

  render(){
    return(
      <Switch>
        <Route
          path="/total"
          exact
          render={props => (
            this.state.dataLoad
            ? <div>
                <div>
                <PieChart
                  {...props}
                  dtTotal= {this.state.total}
                  title='COVID India Total Confirmed Cases'
                  // dtStates={this.state.states}
                />
                </div>
                <div align="center">
                  <br/>
                <a href="/">Check data for state-wise confirmed cases here...</a>
                 <br/>
                </div>
                
              
              <div>
                <TableData
                  {...props}
                  data={this.state.total}
                />
              </div>
              
              </div>
            : <p align="center">Loading...</p>
          )}
        />
        <Route
          path="/"
          exact
          render={props => (
            this.state.dataLoad
            ? <div>
                <div>
                <PieChart
                  {...props}
                  dtTotal= {this.state.total}
                  dtStates={this.state.states}
                  title='COVID India Confirmed Cases (State-wise data)'
                />
                </div>
                <div align="center">
                  <br/>
                <a href="/total">Check data for total confirmed cases in India here...</a>
                 <br/>
                </div>
                <div>
                <TableData
                  {...props}
                  dataStates={this.state.states}
                />
              </div>

              </div>

            : <p align="center">Loading...</p>
          )}
        />
        <Redirect to="/"/>
      </Switch>
    );
  }
}

export default App;
