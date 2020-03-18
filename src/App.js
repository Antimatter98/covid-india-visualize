import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import PieChart from './components/piechart';
import TableData from './components/table';
import LineChart from './components/linechart';

class App extends Component{
  state = {
    dataLoad: false,
    data: [],
    states: [],
    total: [],
    daily: []
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
      fetch('https://api.rootnet.in/covid19-in/stats/daily')
        .then(result => {
          return result.json();
        })
        .then(res => {
          let sum = [];
          for(var i=0; i<res.data.length; i++){
            var tmp = {}
            for(var key in res.data[i]){
              //console.log(key)
              if (key === 'day'){
                tmp = {date: res.data[i][key]};
                //console.log(res.data[i][key])
              }
              if(key === 'summary'){
                for(var key1 in res.data[i][key]){
                  //console.log(res.data[i][key])
                  tmp[key1] = res.data[i][key][key1];
                }
              }
            }
            sum.push(tmp);
          }
          //console.log(sum);
          this.setState({dataLoad: true, data: [], states: states, total: total, daily: sum});
          //this.setState({daily: sum});
          //console.log(this.state);
        })
        .catch(err => {
          console.log(err);
        });
      //console.log(this.state.total[0].total);
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
            ? <div align="center">
                <div>
                  <h2>Data for COVID-19 in India</h2>
                  <br/>
                </div>
                <div>
                  <LineChart
                    {...props}
                    data={this.state.daily}
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
                  <h3>Total confirmed cases : {this.state.total[0].total}</h3>
                  <h3>Total cured/discharged cases : {this.state.total[0].cured_dischargedTotal}</h3>
                  <h3>Total death cases : {this.state.total[0].deathsTotal}</h3>
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
