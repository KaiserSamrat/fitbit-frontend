import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardHeartData} from '../../../store/Dashboard/action'
import Select from "react-select";
// import { Card, CardBody } from "reactstrap";
const categories1 = [
  {
    name: "Out of Range",
    value: "Out of Range",
  },
  {
    name: "Fat Burn",
    value: "Fat Burn",
  },
  {
    name: "Cardio",
    value: "Cardio",
  },
  {
    name: "Peak",
    value: "Peak",
  },

];
const HeartData = () => {
  const dispatch = useDispatch();
  const [categoryCurrent, setCategoryCurrent] = useState("Out of Range");
  const { startDateRange, endDateRange, authtoken, userId, heartData } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    userId: state.Login.loginId,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    heartData: state.DashboardReducer.heartData,
   
  }));

console.log('heartData', heartData);

  useEffect(() => {
    dispatch(getDashboardHeartData(authtoken, 'heart', userId, startDateRange, endDateRange));
  }, [startDateRange,endDateRange ]);

let caloriesOut = []
let maxData = []
let minData = []
let minutesData = []
let dataArray = []
for (let i = 0; i <heartData?.data?.length; i++){
  dataArray.push(heartData?.data[i].dateString)
  if(categoryCurrent==="Out of Range"){
    caloriesOut.push(heartData?.data?.[i].value?.heartRateZones?.[0].caloriesOut || 0)
    maxData.push(heartData?.data?.[i].value?.heartRateZones?.[0].max || 0)
    minData.push(heartData?.data?.[i].value?.heartRateZones?.[0].min || 0)
    minutesData.push(heartData?.data?.[i].value?.heartRateZones?.[0].minutes || 0)
  }
  if(categoryCurrent==="Fat Burn"){
    caloriesOut.push(heartData?.data?.[i].value?.heartRateZones?.[1].caloriesOut || 0)
    maxData.push(heartData?.data?.[i].value?.heartRateZones?.[1].max || 0)
    minData.push(heartData?.data?.[i].value?.heartRateZones?.[1].min || 0)
    minutesData.push(heartData?.data?.[i].value?.heartRateZones?.[1].minutes || 0)
  }
  if(categoryCurrent==="Cardio"){
    caloriesOut.push(heartData?.data?.[i].value?.heartRateZones?.[2].caloriesOut || 0)
    maxData.push(heartData?.data?.[i].value?.heartRateZones?.[2].max || 0)
    minData.push(heartData?.data?.[i].value?.heartRateZones?.[2].min || 0)
    minutesData.push(heartData?.data?.[i].value?.heartRateZones?.[2].minutes || 0)
  }
  if(categoryCurrent==="Peak"){
    caloriesOut.push(heartData?.data?.[i].value?.heartRateZones?.[3].caloriesOut || 0)
    maxData.push(heartData?.data?.[i].value?.heartRateZones?.[3].max || 0)
    minData.push(heartData?.data?.[i].value?.heartRateZones?.[3].min || 0)
    minutesData.push(heartData?.data?.[i].value?.heartRateZones?.[3].minutes || 0)
    
  }
}
// console.log('caloriesOut', caloriesOut);
// console.log('maxData', maxData);
// console.log('minData', minData);
// console.log('minutesData', minutesData);
// console.log('dataArray', dataArray);
  const options = {
    series: [{
      name: 'Calories out',
      type: 'column',
      data: caloriesOut || []
    }, {
      name: 'Maximum',
      type: 'column',
      data: maxData || []
    }, {
      name: 'Minimum',
      type: 'line',
      data: minData || []
    },
    {
      name: 'Minutes',
      type: 'line',
      data: minutesData || []
    }],
    xaxis: {
      categories:  dataArray|| [],
   
    },
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: '',
        align: 'left',
        offsetX: 110
      },
    
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB',
            }
          },
          title: {
            text: "",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
    
       
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    },
  
  };
  const handleCurrentDateCategory = (data) => {
    if (data?.value) {
      setCategoryCurrent(data?.value);
    } else {
      setCategoryCurrent("Out of Range");
    }
  };
  return (
    <>
      <Card className="brandanalytic">
        <Card.Body>
          <div className="chart-title-top-content d-flex align-items-center">
            <h6 className="card-title me-3">Calories data</h6>
            <Select
                  name="Warehouse"
                  className="mb-1"
                  classNamePrefix="select2-selection"
                  placeholder="Select Categories"
                  cacheOptions
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.value}
                  isClearable
                  options={categories1}
                  onChange={handleCurrentDateCategory}
                />
          </div>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={options.series || []}
                  type="line"
                  height={350}
                  className="apex-charts"
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default HeartData;