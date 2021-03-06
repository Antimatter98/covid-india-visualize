import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/2vyv694u/';

  render() {

    function getDate(a){
      //let a = "3/26/2020";
      let trimmed = a.split("-");
      let dateNew = trimmed[2];
      //console.log(trimmed[1]);
      switch(trimmed[1]){
        case "01":
        case "1":
          dateNew += " Jan";
          break;
        case "02":
        case "2":
          dateNew += " Feb";
          break;
        case "03":
        case "3":
          dateNew += " Mar";
          break;
        case "04":
        case "4":
          dateNew += " Apr";
          break;
        case "05":
        case "5":
          dateNew += " May";
          break;
        case "06":
        case "6":
          dateNew += " Jun";
          break;
        case "07":
        case "7":
          dateNew += " Jul";
          break;
        case "08":
        case "8":
          dateNew += " Aug";
          break;
        case "09":
        case "9":
          dateNew += " Sept";
          break;
        case "10":
          dateNew += " Oct";
          break;
        case "11":
          dateNew += " Nov";
          break;
        case "12":
          dateNew += " Dec";
          break;
        default:
          break;
      }
      //console.log(dateNew);
      return dateNew;
    }

	var newData = []
	this.props.data.map(item => {
        //console.log(this.props.dtTotal[0].localTotal);
        //console.log(item.date);
        return newData.push({Date: getDate(item.date), TotalCases: item.total, TotalDeaths: item.deaths, TotalDischarged: item.discharged});
	});
	//console.log(newData);
	var winWidth = 600;
	if((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 600){
		winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}
	  
    return (
      <div align="center">
        <h6>Total confirmed cases</h6>
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
        <h6>Total discharged cases</h6>
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
		<h6>Total death cases</h6>
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
