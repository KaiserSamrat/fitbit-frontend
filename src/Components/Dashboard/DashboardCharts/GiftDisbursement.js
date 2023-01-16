import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {getGiftDisbursement, getDashboardStock} from '../../../store/Dashboard/action'
// import { Card, CardBody } from "reactstrap";
const GiftDisbursement = () => {
  const dispatch = useDispatch();
  const { startDateRange, endDateRange, authtoken, DisbursementGiftData, dashboardStock } =
  useSelector((state) => ({
    authtoken: state.Login.token,
    DisbursementGiftData : state.DashboardReducer.DisbursementGiftData,
    dashboardStock: state.DashboardReducer.dashboardStock,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange:  state.DashboardReducer.endDateRange,
    topBanner: state.DashboardReducer.topBanner
  }));
  // console.log('dashboardStock',dashboardStock);

  let hubData = []
  let stockData = []
  dashboardStock?.data?.stock?.map((data)=>{
    hubData.push(data?.warehouses?.name)
    stockData.push(data?.stock)

  })
  
  // useEffect(() => {
  //   dispatch(getGiftDisbursement(authtoken, startDateRange, endDateRange));
  // }, [startDateRange, endDateRange]);
  useEffect(() => {
    dispatch(getDashboardStock(authtoken));
  }, []);

  let monthData = DisbursementGiftData?.data?.month
  let quantityData = DisbursementGiftData?.data?.unit
  const options = {
    series: [
      {
        name: "Quantity",
        data: stockData || [],
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
      categories: hubData || [],
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
            <h6 className="card-title">Hub Stock Data (On hand Stock)</h6>
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
export default GiftDisbursement;
