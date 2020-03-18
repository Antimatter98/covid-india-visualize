import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/2vyv694u/';

  render() {
	var newData = []
	this.props.data.map(item => {
        //console.log(this.props.dtTotal[0].localTotal);
        //console.log(item.date);
        return newData.push({Date: item.date, TotalCases: item.total, TotalDeaths: item.deaths, TotalDischarged: item.discharged});
	});
	//console.log(newData);
	var winWidth = 600;
	if((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 600){
		winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}
	  
    return (
      <div align="center">
        <h5>Total confirmed cases</h5>
        <AreaChart
          width={winWidth}
          height={200}
          data={newData}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="TotalCases" stroke="#ff8000" fill="#ffb263" />
        </AreaChart>
		<br/>
        <h5>Total discharged cases</h5>
        <AreaChart
          width={winWidth}
          height={200}
          data={newData}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="TotalDischarged" stroke="#05ff71" fill="#82ca9d" />
        </AreaChart>
		<br/>
		<h5>Total death cases</h5>
        <AreaChart
          width={winWidth}
          height={200}
          data={newData}
          syncId="anyId"
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="TotalDeaths" stroke="#ff0505" fill="#ff6969" />
        </AreaChart>
      </div>
    );
  }
}
