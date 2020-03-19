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
    fetch('https://api.rootnet.in/covid19-in/stats/latest')
    .then(result => {
      return result.json();
    })
    .then((res) => {
      //console.log(res);
      //this.data = res;
      let states=[];
      let total = [];
      //console.log(res.stateData);
      //console.log(res.data.regional);

      res.data.regional.map(key => {
        return states.push({state: key.loc, cases: (key.confirmedCasesIndian + key.confirmedCasesForeign), cured_discharged: key.discharged, deaths: key.deaths});
      })

      // for (var key in res.data.regional) {
      //   var tmp = {state: key.loc, cases: (key.confirmedCasesIndian + key.confirmedCasesForeign), cured_discharged: key.discharged, deaths: key.deaths};
      //   // for (var key1 in res.stateData[key]) {
      //   //   //console.log(key, key1, res.stateData[key][key1]);
      //   //   tmp[key1] = res.stateData[key][key1];
      //   // }
      //   //console.log(tmp);
      //   states.push(tmp);
      // }
      //console.log(states);

      total.push(res.data.summary)
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
                  <h4>Total confirmed cases : {this.state.total[0].total}</h4>
                  <h4>Total cured cases : {this.state.total[0].discharged}</h4>
                  <h4>Total death cases : {this.state.total[0].deaths}</h4>
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
