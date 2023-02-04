import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardHeartData} from '../../../store/Dashboard/action'
// import { Card, CardBody } from "reactstrap";
const HeartData = () => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, userId, heartData } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    userId: state.Login.loginId,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    heartData: state.DashboardReducer.heartData,
   
  }));

console.log('caloriesData', heartData);

  useEffect(() => {
    dispatch(getDashboardHeartData(authtoken, 'heart', userId, startDateRange, endDateRange));
  }, [startDateRange,endDateRange ]);

let valueArray = []
let dataArray = []
for (let i = 0; i <heartData?.data?.length; i++){
  valueArray.push(heartData?.data[i].value*1)
  dataArray.push(heartData?.data[i].dateString)
}
console.log('valueArray', valueArray);
  const options = {
    series: [
      {
        name: "Value",
        data:valueArray|| [],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: [
      "#438EFE",
    ],
    plotOptions: {
      bar: {
        columnWidth: "15%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    
    xaxis: {
      categories:  dataArray|| [],
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      
      },
      axisBorder: {
        show: false,
        
      },
      axisTicks: {
        show: false,
      },
    },
  };
  return (
    <>
      <Card className="brandanalytic">
        <Card.Body>
          <div className="chart-title-top-content">
            <h6 className="card-title">Calories data</h6>
          </div>

          <div>
            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={options.series || []}
                  type="bar"
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
