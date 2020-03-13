import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel }
from '@syncfusion/ej2-react-charts';
import * as React from 'react';

class App extends React.Component {
  
  render() {
    // let dataTotal = []
    // let dataLocal = []
    let data = []
    let datalabel = {
      visible: true,
      position: 'Outside',
      name: 'y',
      font: {
        fontWeight: '600'
      }
    }
    if(this.props.dtStates){
      this.props.dtStates.map(item => {
        //console.log(this.props.dtTotal[0].localTotal);
        return data.push({x: item.item.state, y: ((item.item.localCases/this.props.dtTotal[0].localTotal)*100.0).toFixed(2), text:'intTotal', fill: '#00226C'})
        //data.push({x: 'localTotal', y: (item.localTotal/item.total)*100.0, text:'localTotal', fill: '#0450C2'})
      });
    }
    else if(this.props.dtStatesIntl){
      this.props.dtStatesIntl.map(item => {
        //console.log(this.props.dtTotal[0].localTotal);
        return data.push({x: item.item.state, y: ((item.item.intCases/this.props.dtTotal[0].intTotal)*100.0).toFixed(2), text:'intTotal', fill: '#00226C'})
        //data.push({x: 'localTotal', y: (item.localTotal/item.total)*100.0, text:'localTotal', fill: '#0450C2'})
      });
    }
    else if(this.props.dtTotal){
      this.props.dtTotal.map(item => {
        data.push({x: 'Total Confirmed cases ( Foreign National )', y: ((item.intTotal/item.total)*100).toFixed(2), text:'intTotal', fill: '#00226C'})
        data.push({x: 'Total Confirmed cases (Indian National)', y: ((item.localTotal/item.total)*100).toFixed(2), text:'localTotal', fill: '#0450C2'})
        return null;
      });
    }
    
    //console.log(data);
    return (
    <div>
    <AccumulationChartComponent id='charts' title={this.props.title} enableSmartLabels={true} enableAnimation={true} center={{x: '50%', y: '50%'}} tooltip={{ enable: true}}>
    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
    <AccumulationSeriesCollectionDirective>
      <AccumulationSeriesDirective dataSource={data} dataLabel={datalabel} xName='x' yName='y' type='Pie'/>
    </AccumulationSeriesCollectionDirective>
  </AccumulationChartComponent>

    {/* <AccumulationChartComponent id='charts' title='COVID india' enableSmartLabels={true} enableAnimation={false} center={{x: '50%', y: '50%'}} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}%</b>' }}>
    <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
    <AccumulationSeriesCollectionDirective>
      <AccumulationSeriesDirective dataSource={dataLocal} dataLabel={datalabel} xName='x' yName='y' type='Pie'/>
    </AccumulationSeriesCollectionDirective>
  </AccumulationChartComponent> */}
   </div>
  );
  }
};

export default App;