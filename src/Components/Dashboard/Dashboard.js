import moment from "moment";
import axios from "axios";
import "./dashboard.scss";

import box from "./img/box.svg";
import documentText from "./img/document-text.svg";
import house from "./img/house.svg";

import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbDashboard from "../../Breadcrumb/BreadcrumbDashboard";
import { getTopBanner, storeDashboardData } from "../../store/Dashboard/action";
import { getExtendToken } from "../../store/actions";
import GiftDisbursement from "./DashboardCharts/CaloriesData";

import CaloriesData from "./DashboardCharts/CaloriesData";
import StepData from "./DashboardCharts/StepData";
import DistanceData from "./DashboardCharts/DistanceData";
import FloorData from "./DashboardCharts/FloorData";
import ElevationData from "./DashboardCharts/ElevationData";
import { API_URL } from "../../helpers/api_helper";
import XLSX from "xlsx";
import Select from "react-select";
const categories1 = [
  {
    name: "floors",
    value: "floors",
  },
  {
    name: "calories",
    value: "calories",
  },
  {
    name: "distance",
    value: "distance",
  },
  {
    name: "elevation",
    value: "elevation",
  },
  {
    name: "steps",
    value: "steps",
  },
  {
    name: "heart",
    value: "heart",
  },
];
const Dashboard = () => {
  const dispatch = useDispatch();
  const [currentDataLoading, setCurrentDataLoading] = useState(false);
  const [categoryCurrent, setCategoryCurrent] = useState("heart");
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const { startDateRange, endDateRange, authtoken, fitbit } = useSelector((state) => ({
    authtoken: state.Login.token,
    fitbit: state.Login.fitbit,
    startDateRange: state.DashboardReducer.startDateRange,
    endDateRange: state.DashboardReducer.endDateRange,
  }));
  const handleStartDate = (e) => {

    setStartDate(e.target.value);
    const  compareStartDay = moment(e.target.value).diff(moment(endDate), 'days');
    console.log("compareStartDay", compareStartDay);
    if(compareStartDay<0){
      
      dispatch(
        storeDashboardData(
          "startDateRange",
          moment(e.target.value).format("YYYY-MM-DD")
        )
      );
      dispatch(
        storeDashboardData(
          "endDateRange",
          moment(endDate).format("YYYY-MM-DD")
        )
      );
    }
    else{
      toast("Start date can not be Larger than End date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    const  compareEndDay = moment(e.target.value).diff(moment(startDate), 'days');
    if(compareEndDay>-1){
      dispatch(
        storeDashboardData(
          "startDateRange",
          moment(startDate).format("YYYY-MM-DD")
        )
      );
      dispatch(
        storeDashboardData(
          "endDateRange",
          moment(e.target.value).format("YYYY-MM-DD")
        )
      );
    }
    else{
      toast("End date can not be smaller than From date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    
 
  };
  const handleCurrentDateExcel = () => {
    setCurrentDataLoading(true);
    fetch(
      `${API_URL}/users/get-activity-data?activityName=${categoryCurrent}&startDate=${currentDate}&endDate=${currentDate}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => handleExcel(data))
      .catch((err) => {
        console.log(err.message);
        toast("Downloading Excel Failed");
        setCurrentDataLoading(false);
      });
  };
  const handleExcel = (fitbitData) => {
    console.log("fitbitData", fitbitData);
    let newArray = [];
    if (categoryCurrent === "steps") {
      fitbitData?.data?.["activities-steps-intraday"]?.dataset?.forEach(
        (info, index) => {
          let data = {};
          data.category = categoryCurrent;
          data.date =
            fitbitData?.data?.["activities-steps"]?.[0]?.dateTime || "";
          data.time = info?.time;
          data.value = info?.value;
          data.totalValue =
            fitbitData?.data?.["activities-steps"]?.[0]?.value || "";

          newArray.push(data);
        }
      );
      downloadxls(newArray);
    }
    if (categoryCurrent === "calories") {
      fitbitData?.data?.["activities-calories-intraday"]?.dataset?.forEach(
        (info, index) => {
          let data = {};
          data.category = categoryCurrent;
          data.date =
            fitbitData?.data?.["activities-calories"]?.[0]?.dateTime || "";
          data.time = info?.time;
          data.value = info?.value;
          data.totalValue =
            fitbitData?.data?.["activities-calories"]?.[0]?.value || "";

          newArray.push(data);
        }
      );
      downloadxls(newArray);
    }
    if (categoryCurrent === "distance") {
      fitbitData?.data?.["activities-distance-intraday"]?.dataset?.forEach(
        (info, index) => {
          let data = {};
          data.category = categoryCurrent;
          data.date =
            fitbitData?.data?.["activities-distance"]?.[0]?.dateTime || "";
          data.time = info?.time;
          data.value = info?.value;
          data.totalValue =
            fitbitData?.data?.["activities-distance"]?.[0]?.value || "";

          newArray.push(data);
        }
      );
      downloadxls(newArray);
    }
    if (categoryCurrent === "elevation") {
      fitbitData?.data?.["activities-elevation-intraday"]?.dataset?.forEach(
        (info, index) => {
          let data = {};
          data.category = categoryCurrent;
          data.date =
            fitbitData?.data?.["activities-elevation"]?.[0]?.dateTime || "";
          data.time = info?.time;
          data.value = info?.value;
          data.totalValue =
            fitbitData?.data?.["activities-elevation"]?.[0]?.value || "";

          newArray.push(data);
        }
      );
      downloadxls(newArray);
    }
    if (categoryCurrent === "floors") {
      fitbitData?.data?.["activities-floors-intraday"]?.dataset?.forEach(
        (info, index) => {
          let data = {};
          data.category = categoryCurrent;
          data.date =
            fitbitData?.data?.["activities-floors"]?.[0]?.dateTime || "";
          data.time = info?.time;
          data.value = info?.value;
          data.totalValue =
            fitbitData?.data?.["activities-floors"]?.[0]?.value || "";

          newArray.push(data);
        }
      );
      downloadxls(newArray);
    }
    if (categoryCurrent === "heart") {
      fitbitData?.data?.["activities-heart-intraday"]?.dataset?.forEach(
        (info, index) => {
          let data = {};
          data.category = categoryCurrent;
          data.date =
            fitbitData?.data?.["activities-heart"]?.[0]?.dateTime || "";
          data.restingHeartRate =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.restingHeartRate;
          data.name =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.heartRateZones?.[index]?.name;
          data.minutes =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.heartRateZones?.[index]?.minutes;
          data.caloriesOut =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.heartRateZones?.[index]?.caloriesOut;
          data.minHeartRate =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.heartRateZones?.[index]?.min;
          data.maxHeartRate =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.heartRateZones?.[index]?.max;
          data.minutes =
            fitbitData?.data?.[
              "activities-heart"
            ]?.[0]?.value?.heartRateZones?.[index]?.minutes;
          data.time = info?.time;
          data.value = info?.value;

          newArray.push(data);
        }
      );
      downloadxls(newArray);
    }
  };
  const downloadxls = (currrentData) => {
    const ws = XLSX.utils.json_to_sheet(currrentData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, `${categoryCurrent} Data_${currentDate}.xlsx`);
    setCurrentDataLoading(false);
  };
  const handleChangeDate = (e) => {
    setCurrentDate(e.target.value);
  };
  const handleCurrentDateCategory = (data) => {
    if(data?.value){
      setCategoryCurrent(data?.value);
    }
    else{
      setCategoryCurrent('heart')
   
  };
}
  return (
    <Container fluid>
      <BreadcrumbDashboard leftTitle="Dashboard" />
      <h5 className="m-3">Download user data for single date:</h5>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 date_search_area">
              <Form className="form-horizontal-form-wrap">
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
                <Form.Group className="form-data-filtering custom-bottom-margin">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={currentDate}
                    onChange={handleChangeDate}
                  />
                </Form.Group>
              </Form>{" "}
            </div>
            {currentDataLoading === true ? (
              <div className="text-center mt-3">
                <h6>Downloading...</h6>
              </div>
            ) : (
              <div className="text-center mt-3">
                <Button onClick={handleCurrentDateExcel}>Download Excel</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 date_search_area">
              <Form className="form-horizontal-form-wrap">
                <Form.Group className="form-data-filtering custom-bottom-margin">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={handleStartDate}
                  />
                </Form.Group>
                <Form.Group className="form-data-filtering">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={handleEndDate}
                  />
                </Form.Group>
              </Form>{" "}
            </div>
          </div>
        </div>
      </div>
      {/* <button className="btn btn-primary" onClick={()=>handleData()}>data fetch</button> */}

      <div className="dashboard-data-all-information-bottom-content mb-5">
        <Row>
          <Col lg={12}>
            <CaloriesData />
          </Col>
          <Col lg={12}>
            <StepData/>
           
          </Col>

          <Col lg={12}>
            <DistanceData/>
           
          </Col>
          <Col lg={12}>
            <FloorData/>
           
          </Col>
        
          <Col lg={12}>
         <ElevationData/>
          </Col>
          <Col lg={4}>
            
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Dashboard;
