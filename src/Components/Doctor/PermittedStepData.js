import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStepData } from "../../store/actions";

const PermittedStepData = ({id}) => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, userId, stepData } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    userId: state.Login.loginId,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    stepData: state.DashboardReducer.stepData,
   
  }));



  useEffect(() => {
    dispatch(getDashboardStepData(authtoken, 'steps', id, startDateRange, endDateRange));
  }, [startDateRange,endDateRange ]);

let valueArray = []
let dataArray = []
for (let i = 0; i <stepData?.data?.length; i++){
  valueArray.push(stepData?.data[i].value*1)
  dataArray.push(stepData?.data[i].dateString)
}
console.log('valueArray', valueArray);
  const options = {
    series: [
      {
        name: "Value",
        data: valueArray|| [],
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
      "#e3e649",
    ],
    plotOptions: {
      bar: {
        columnWidth: "25%",
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
            <h6 className="card-title">Steps data</h6>
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
export default PermittedStepData;
