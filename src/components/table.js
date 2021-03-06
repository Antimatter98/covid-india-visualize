import React, { Component } from 'react'
import '../App.css'

class Table extends Component {
   constructor(props) {
      super(props) 
      this.state = {
         data: []
      }
   }
   rows = [];
   renderTableHeader() {
    let header = Object.keys(this.rows[0])
    return header.map((key, index) => {
       return <th key={index}>{key}</th>
    })
    }

    renderTableData() {
        if(this.props.dataStates){
            return this.rows.map((row, index) => {
                const { SrNo, State, Cases, Cured, Deaths} = row;
                //console.log(student.SrNo);
                return (
                    <tr key={SrNo}>
                        <td>{SrNo}</td>
                        <td>{State}</td>
                        <td>{Cases}</td>
                        <td>{Cured}</td>
                        <td>{Deaths}</td>
                    </tr>
                );
            });
        }
        else if(this.props.data){
            return this.rows.map((row, index) => {
            const {TotalIndianNationals, TotalForeignNationals, TotalCured, TotalDeaths, Total } = row;
            //console.log(student.SrNo);
            return (
                <tr key={1}>
                    <td>{TotalIndianNationals}</td>
                    <td>{TotalForeignNationals}</td>
                    <td>{TotalCured}</td>
                    <td>{TotalDeaths}</td>
                    <td>{Total}</td>
                </tr>
            )
            })
        }
    }

   render() { 
      let row = [];
      if(this.props.dataStates){
        this.props.dataStates.map((item, key) => {
            //console.log(item);
            return row.push({SrNo: key+1, State: item.state, Cases: item.cases, Cured: item.cured_discharged, Deaths: item.deaths});
        });
        this.rows = row;
      }
      else if(this.props.data){
        this.props.data.map((item, key) => {
            return row.push({TotalIndianNationals: item.confirmedCasesIndian, TotalForeignNationals: item.confirmedCasesForeign, TotalCured: item.discharged, TotalDeaths: item.deaths, Total: (item.total)});
        });
        this.rows = row;
      }
      //console.log(this.rows);

      
      return (
        <div align="center" className="table-responsive">
        <table id='data' className="table-striped table-bordered">
           <tbody>
            <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
           </tbody>
        </table>
     </div>
      )
   }
}

export default Table;