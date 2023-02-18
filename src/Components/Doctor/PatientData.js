import moment from "moment";
import axios from "axios";
import "./dashboard.scss";



import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbDashboard from "../../Breadcrumb/BreadcrumbDashboard";
import { getTopBanner, storeDashboardData } from "../../store/Dashboard/action";
import { getExtendToken } from "../../store/actions";



import Select from "react-select";
import { useParams } from "react-router-dom";
import PermittedCalData from "./PermittedCalData";
import PermittedStepData from "./PermittedStepData";
import PermittedFloorData from "./PermittedFloorData";
import PermittedElevationData from "./PermittedElevatioData";
import PermittedDistanceData from "./PermittedDistanceData";
import PermittedHeartData from "./PermittedHeartData";

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
const PatientData = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  console.log('nvd', id);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const { startDateRange, endDateRange, authtoken, fitbit } = useSelector(
    (state) => ({
      authtoken: state.Login.token,
      fitbit: state.Login.fitbit,
      startDateRange: state.DashboardReducer.startDateRange,
      endDateRange: state.DashboardReducer.endDateRange,
    })
  );
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    const compareStartDay = moment(e.target.value).diff(
      moment(endDate),
      "days"
    );
    console.log("compareStartDay", compareStartDay);
    if (compareStartDay < 0) {
      dispatch(
        storeDashboardData(
          "startDateRange",
          moment(e.target.value).format("YYYY-MM-DD")
        )
      );
      dispatch(
        storeDashboardData("endDateRange", moment(endDate).format("YYYY-MM-DD"))
      );
    } else {
      toast("Start date can not be Larger than End date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    const compareEndDay = moment(e.target.value).diff(
      moment(startDate),
      "days"
    );
    if (compareEndDay > -1) {
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
    } else {
      toast("End date can not be smaller than From date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  useEffect(() => {
    if(fitbit===true){
      dispatch(getExtendToken(authtoken));
    }
    
  }, []);
  return (
    <Container fluid>
      <BreadcrumbDashboard leftTitle="Dashboard" />
     
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
            <PermittedCalData id={id} />
          </Col>
          <Col lg={12}>
            <PermittedStepData id={id}/>
          </Col>

          <Col lg={12}>
            <PermittedDistanceData id={id} />
          </Col>
          {/* <Col lg={12}>
            <PermittedFloorData id={id}/>
          </Col> */}

          {/* <Col lg={12}>
            <PermittedElevationData  id={id}/>
          </Col> */}
          <Col lg={12}><PermittedHeartData id={id}/></Col>
        </Row>
      </div>
    </Container>
  );
};

export default PatientData;
