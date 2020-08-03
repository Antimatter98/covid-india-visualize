import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import PieChart from "./components/piechart";
import TableData from "./components/table";
import LineChart from "./components/linechart";
//import LineChartTesting from "./components/linechartTestings";

const Footer = () => (
  <footer className="footer">
    <p>
      Made by Nishant Tilve <br />{" "}
      <a href="https://twitter.com/niche_nt">@niche_nt</a>
    </p>
  </footer>
);

class App extends Component {
  state = {
    dataLoad: false,
    data: [],
    states: [],
    total: [],
    daily: [],
    tests: [],
  };

  componentDidMount() {
    let states = [];
    let total = [];
    let sum = [];
    let newData = [];
    (async () => {
      try {
        var result = await fetch(
          "https://api.rootnet.in/covid19-in/stats/latest"
        );
        var res = await result.json();

        res.data.regional.map((key) => {
          return states.push({
            state: key.loc,
            cases: key.confirmedCasesIndian + key.confirmedCasesForeign,
            cured_discharged: key.discharged,
            deaths: key.deaths,
          });
        });

        total.push(res.data.summary);

        result = await fetch("https://api.rootnet.in/covid19-in/stats/daily");
        res = await result.json();

        for (var i = 0; i < res.data.length; i++) {
          var tmp = {};
          for (var key in res.data[i]) {
            //console.log(key)
            if (key === "day") {
              tmp = { date: res.data[i][key] };
              //console.log(res.data[i][key])
            }
            if (key === "summary") {
              for (var key1 in res.data[i][key]) {
                //console.log(res.data[i][key])
                tmp[key1] = res.data[i][key][key1];
              }
            }
          }
          sum.push(tmp);
        }
        states = states.sort(function (a, b) {
          return b.cases - a.cases;
        });

        result = await fetch(
          "https://api.rootnet.in/covid19-in/stats/testing/history"
        );
        res = await result.json();

        res.data.map((item) => {
          if (
            item.totalSamplesTested !== null &&
            item.totalPositiveCases !== null
          ) {
            return newData.push({
              Date: item.day,
              TotalSamplesTested: item.totalSamplesTested,
              TotalPeopleTested: item.totalIndividualsTested,
              TotalPositiveCases: item.totalPositiveCases,
            });
          } else {
            return null;
          }
        });
        //console.log(newData);
        //this.loading = false;
        this.setState({
          dataLoad: true,
          data: [],
          states: states,
          total: total,
          daily: sum,
          tests: newData,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }

  render() {
    return (
      <Switch>
        <Route
          path="/total"
          exact
          render={(props) =>
            this.state.dataLoad ? (
              <div>
                <div align="center" className="page-wrap">
                  <div>
                    <h5>Data for COVID-19 in India</h5>
                    <br />
                  </div>
                  <div>
                    <LineChart {...props} data={this.state.daily} />
                  </div>

                  <div align="center">
                    <br />
                    <a href="/">
                      Check data for state-wise confirmed cases here...
                    </a>
                    {/* <br/>
                  <a href="/tests">Check data COVID-19 tests conducted in India here...</a> */}
                  </div>

                  <div>
                    <TableData {...props} data={this.state.total} />
                  </div>
                </div>
                <Footer />
              </div>
            ) : (
              <p align="center">Loading...</p>
            )
          }
        />
        {/* <Route
          path="/tests"
          exact
          render={props => (
            this.state.dataLoad
            ? <div>
              <div align="center" className="page-wrap">
                <div>
                  <h5>COVID-19 tests in India</h5>
                  <br/>
                </div>
                <div>
                  <LineChartTesting
                  {...props}
                  data={this.state.tests}
                  />
                </div>

                <div align="center">
                  <br/>
                <a href="/">Check data for state-wise confirmed cases here...</a>
                <br/>
                <a href="/total">Check data for total confirmed cases in India here...</a>
                 <br/>
                 <br/>
                </div>
                </div>
              <Footer/>
              </div>
            : <p align="center">Loading...</p>
          )}
        /> */}
        <Route
          path="/"
          exact
          render={(props) =>
            this.state.dataLoad ? (
              <div>
                <div align="center" className="page-wrap">
                  <div>
                    <PieChart
                      {...props}
                      dtTotal={this.state.total}
                      dtStates={this.state.states}
                      title="COVID India Confirmed Cases (State-wise data)"
                    />
                  </div>
                  <div align="center">
                    <b>Total confirmed cases : {this.state.total[0].total}</b>
                    <br />
                    <b>Total cured cases : {this.state.total[0].discharged}</b>
                    <br />
                    <b>Total death cases : {this.state.total[0].deaths}</b>
                    <br />
                  </div>
                  <div align="center">
                    <br />
                    <a href="/total">
                      Check data for total confirmed cases in India here...
                    </a>
                    {/* <br/>
                  <a href="/tests">Check data COVID-19 tests conducted in India here...</a> */}
                  </div>
                  <div>
                    <TableData {...props} dataStates={this.state.states} />
                  </div>
                </div>
                <Footer />
              </div>
            ) : (
              <p align="center">Loading...</p>
            )
          }
        />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default App;
