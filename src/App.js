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
      res.map(item => {
        if(item.state){
          return states.push({item});
        }
        else{
          return total.push(item);
        }
      });
      this.setState({dataLoad: true, data: res, states: states, total: total});
      //console.log(this.state);
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
                  title='COVID India Confirmed Cases'
                  // dtStates={this.state.states}
                />
                </div>
                <div align="center">
                  <br/>
                <a href="/">StateWise confirmed cases(Indian Nationals)</a>
                 <br/>
                  <a href="/statesIntl">StateWise confirmed cases(Foreign Nationals)</a>
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
                  title='COVID India Confirmed Cases (Indian National)'
                />
                </div>
                <div align="center">
                  <br/>
                <a href="/total">Total confirmed cases</a>
                 <br/>
                  <a href="/statesIntl">StateWise confirmed cases(Foreign Nationals)</a>
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
        <Route
          path="/statesIntl"
          exact
          render={props => (
            this.state.dataLoad
            ? <div>
                <div>
                <PieChart
                  {...props}
                  dtTotal= {this.state.total}
                  dtStatesIntl={this.state.states}
                  title='COVID India Confirmed Cases (Foreign National)'
                />
                </div>
                <div align="center">
                  <br/>
                <a href="/statesLocal">StateWise confirmed cases(Indian Nationals)</a>
                 <br/>
                  <a href="/total">Total confirmed cases</a>
                <br/>
                </div>
                <div>
                <TableData
                  {...props}
                  dataIntl={this.state.states}
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
