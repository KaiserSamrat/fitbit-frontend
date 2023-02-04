import moment from "moment";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import XLSX from "xlsx";
import { toast } from "react-toastify";
import { postUserData } from "../../store/actions";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../helpers/api_helper";
const categories = [
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
const DownloadData = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [categoryRange, setCategoryRange] = useState("heart");
  const [categoryCurrent, setCategoryCurrent] = useState("heart");
  const [rangeDataLoading, setRangeDataLoading] = useState(false);
  const [currentDataLoading, setCurrentDataLoading] = useState(false);
  const { authtoken } = useSelector((state) => ({
    authtoken: state.Login.token,
  }));
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const handleChangeDate = (e) => {
    setCurrentDate(e.target.value);
  };
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
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

  const handleDateRangeExcel = () => {
    setRangeDataLoading(true);
    console.log("hello");
    fetch(
      `${API_URL}/users/get-activity-data?activityName=${categoryRange}&startDate=${startDate}&endDate=${endDate}`,
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
      .then((data) => handleExcel2(data))
      .catch((err) => {
        console.log(err.message);
        toast("Downloading Excel Failed");
        setRangeDataLoading(false);
      });
  };
  const handleExcel2 = (fitbitData) => {
    console.log("fitbitData", fitbitData);
    let newArray = [];
    if (categoryRange === "floors") {
      fitbitData?.data?.["activities-floors"].forEach((info, index) => {
        let data = {};
        data.category = categoryRange;
        data.date = info?.dateTime || "";
        data.value = info?.value || 0;
        newArray.push(data);
      });
      downloadxls1(newArray);
    }
    if (categoryRange === "heart") {
      fitbitData?.data?.["activities-heart"].forEach((info, index) => {
        let data = {};
        data.category = categoryRange;
        data.date = info?.dateTime || "";
        data.heartRateZones = info?.value?.heartRateZones?.forEach(
          (dt, idx) => {
            data[` name-${idx + 1}`] = dt?.name;
            data[` caloriesOut-${idx + 1}`] = dt?.caloriesOut;
            data[` min-${idx + 1}`] = dt?.min;
            data[` max-${idx + 1}`] = dt?.max;
            data[` minutes-${idx + 1}`] = dt?.minutes;
          }
        );
        newArray.push(data);
      });
      downloadxls1(newArray);
    }
    if (categoryRange === "calories") {
      fitbitData?.data?.["activities-calories"].forEach((info, index) => {
        let data = {};
        data.category = categoryRange;
        data.date = info?.dateTime || "";
        data.value = info?.value || 0;
        newArray.push(data);
      });
      downloadxls1(newArray);
    }
    if (categoryRange === "distance") {
      fitbitData?.data?.["activities-distance"].forEach((info, index) => {
        let data = {};
        data.category = categoryRange;
        data.date = info?.dateTime || "";
        data.value = info?.value || 0;
        newArray.push(data);
      });
      downloadxls1(newArray);
    }
    if (categoryRange === "elevation") {
      fitbitData?.data?.["activities-elevation"].forEach((info, index) => {
        let data = {};
        data.category = categoryRange;
        data.date = info?.dateTime || "";
        data.value = info?.value || 0;
        newArray.push(data);
      });
      downloadxls1(newArray);
    }
    if (categoryRange === "steps") {
      fitbitData?.data?.["activities-steps"].forEach((info, index) => {
        let data = {};
        data.category = categoryRange;
        data.date = info?.dateTime || "";
        data.value = info?.value || 0;
        newArray.push(data);
      });
      downloadxls1(newArray);
    }
  };
  const downloadxls1 = (rangeData) => {
   console.log('data', rangeData);
   let obj={
    data: rangeData
  }
  dispatch(postUserData(obj, history, authtoken));
    const ws = XLSX.utils.json_to_sheet(rangeData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, `${categoryRange} Data.xlsx`);
    setRangeDataLoading(false);
  };
  const handleCategories = (data) => {
    console.log("daata", data);
    if(data?.value){
      setCategoryRange(data?.value);
    }
    else{
      setCategoryRange('heart')
    }
   
  };
  const handleCurrentDateCategory = (data) => {
    if(data?.value){
      setCategoryCurrent(data?.value);
    }
    else{
      setCategoryCurrent('heart')
   
  };
}
  // setRangeDataLoading(false);
  return (
    <div className="page-content">
      <h5 className="mb-3">Download user data for single date:</h5>
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
      <h5 className="mb-3">Download Excel for summerize data:</h5>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 date_search_area">
              <Form className="form-horizontal-form-wrap">
                <Select
                  name="Warehouse"
                  className="mb-2"
                  classNamePrefix="select2-selection"
                  placeholder="Select Categories"
                  cacheOptions
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.value}
                  isClearable
                  options={categories}
                  onChange={handleCategories}
                />
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
            {rangeDataLoading === true ? (
              <div className="text-center mt-3">
                <h6>Downloading...</h6>
              </div>
            ) : (
              <div className="text-center mt-3">
                <Button onClick={handleDateRangeExcel}>Download Excel</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadData;
