import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardFloorData } from "../../store/actions";

const PermittedFloorData = ({id}) => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, userId, floorData } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    userId: state.Login.loginId,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    floorData: state.DashboardReducer.floorData,
   
  }));



  useEffect(() => {
    dispatch(getDashboardFloorData(authtoken, 'floors', id, startDateRange, endDateRange));
  }, [startDateRange,endDateRange ]);

let valueArray = []
let dataArray = []
for (let i = 0; i <floorData?.data?.length; i++){
  valueArray.push(floorData?.data[i].value*1)
  dataArray.push(floorData?.data[i].dateString)
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
      "#d694e0",
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
            <h6 className="card-title">Floor data</h6>
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
export default PermittedFloorData;
