import React, { Component } from 'react'

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
                const { SrNo, State, Cases, Helpline } = row 
                //console.log(student.SrNo);
                return (
                    <tr key={SrNo}>
                        <td>{SrNo}</td>
                        <td>{State}</td>
                        <td>{Cases}</td>
                        <td>{Helpline}</td>
                    </tr>
                );
            });
        }
        else if(this.props.data){
            return this.rows.map((row, index) => {
            const {TotalIndianNationals, TotalForeignNationals, Total } = row 
            //console.log(student.SrNo);
            return (
                <tr key={1}>
                    <td>{TotalIndianNationals}</td>
                    <td>{TotalForeignNationals}</td>
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
            return row.push({SrNo: key+1, State: item.state, Cases: item.cases, Helpline: item.helpline});
        });
        this.rows = row;
      }
      else if(this.props.data){
        this.props.data.map((item, key) => {
            return row.push({TotalIndianNationals: item.localTotal, TotalForeignNationals: item.intTotal, Total: (item.total)});
        });
        this.rows = row;
      }
      //console.log(this.rows);

      
      return (
        <div align="center">
        <table id='data'>
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