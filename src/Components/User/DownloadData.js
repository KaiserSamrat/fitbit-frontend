import moment from "moment";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import XLSX from "xlsx";
import { toast } from "react-toastify";
import { postHeartData, postUserData } from "../../store/actions";
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
  const [syncLoading, setSyncLoading] = useState(false)
  const [rangeDataLoading, setRangeDataLoading] = useState(false);
  const [currentDataLoading, setCurrentDataLoading] = useState(false);
  const { authtoken, syncInfoLoading } = useSelector((state) => ({
    authtoken: state.Login.token,
    syncInfoLoading: state.UserReducer.syncInfoLoading,
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
  const [syncBeforeDate, setSyncStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [syncAfterDate, setSyncEndDate] = useState(
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
  
  const handleSyncStartDate = (e) => {
    setSyncStartDate(e.target.value);
  };
  const handleSyncEndDate = (e) => {
    setSyncEndDate(e.target.value);
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
      // console.log(fitbitData?.data?.["activities-heart"],'klklkl');
      // let body={
      //   data: fitbitData?.data?.["activities-heart"]
      // }
      // console.log('body', body);
      // dispatch(postHeartData(body, history, authtoken));

      fitbitData?.data?.["activities-heart"].forEach((info, index) => {
        let heartData = {};
        heartData.category = categoryRange;
        heartData.date = info?.dateTime || "";
        heartData.heartRateZones = info?.value?.heartRateZones?.forEach(
          (dt, idx) => {
            heartData[` name-${idx + 1}`] = dt?.name;
            heartData[` caloriesOut-${idx + 1}`] = dt?.caloriesOut;
            heartData[` min-${idx + 1}`] = dt?.min;
            heartData[` max-${idx + 1}`] = dt?.max;
            heartData[` minutes-${idx + 1}`] = dt?.minutes;
          }
        );
        newArray.push(heartData);
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
  
  // if(categoryRange !== "heart"){
  //   dispatch(postUserData(obj, history, authtoken));
  // }
 
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
const handleSyncData = () =>{
  console.log('hello');
  setSyncLoading(true)

    fetch(
      `${API_URL}/users/get-activity-data?activityName=${'elevation'}&startDate=${syncBeforeDate}&endDate=${syncAfterDate}`,
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
      .then((data) => postSyncData(data))
      .catch((err) => {
        console.log(err.message);
        toast("Downloading Excel Failed");
        setSyncLoading(false);
      });

      // Steps Data Fetch
      fetch(
        `${API_URL}/users/get-activity-data?activityName=${'steps'}&startDate=${syncBeforeDate}&endDate=${syncAfterDate}`,
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
        .then((data) => postSyncData(data))
        .catch((err) => {
          console.log(err.message);
          toast("Downloading Excel Failed");
          setSyncLoading(false);
        });
  // Floors Data Fetch
        fetch(
          `${API_URL}/users/get-activity-data?activityName=${'floors'}&startDate=${syncBeforeDate}&endDate=${syncAfterDate}`,
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
          .then((data) => postSyncData(data))
          .catch((err) => {
            console.log(err.message);
            toast("Downloading Excel Failed");
            setSyncLoading(false);
          });
          // distance data fetch
          fetch(
            `${API_URL}/users/get-activity-data?activityName=${'distance'}&startDate=${syncBeforeDate}&endDate=${syncAfterDate}`,
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
            .then((data) => postSyncData(data))
            .catch((err) => {
              console.log(err.message);
              toast("Downloading Excel Failed");
              setSyncLoading(false);
            });
            // calories data fetch
            fetch(
              `${API_URL}/users/get-activity-data?activityName=${'calories'}&startDate=${syncBeforeDate}&endDate=${syncAfterDate}`,
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
              .then((data) => postSyncData(data))
              .catch((err) => {
                console.log(err.message);
                toast("Downloading Excel Failed");
                setSyncLoading(false);
              });
              // Fetch Heart Data

              fetch(
                `${API_URL}/users/get-activity-data?activityName=${'heart'}&startDate=${syncBeforeDate}&endDate=${syncAfterDate}`,
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
                .then((data) => postSyncData(data))
                .catch((err) => {
                  console.log(err.message);
                  toast("Downloading Excel Failed");
                  setSyncLoading(false);
                });
}
const postSyncData = (data)=>{
  console.log('data kkda', data);
  if (data?.data?.["activities-elevation"]) {
    let eleCationArray =[]
    data?.data?.["activities-elevation"].forEach((info, index) => {
      let data = {};
      data.category = "elevation";
      data.date = info?.dateTime || "";
      data.value = info?.value || 0;
      eleCationArray.push(data);
    });
    let obj={
      data: eleCationArray
    }
    dispatch(postUserData(obj, history, authtoken));
  }
  if (data?.data?.["activities-steps"]) {
    let stepArray =[]
    data?.data?.["activities-steps"].forEach((info, index) => {
      let data = {};
      data.category = "steps";
      data.date = info?.dateTime || "";
      data.value = info?.value || 0;
      stepArray.push(data);
    });
    let obj={
      data: stepArray
    }
    dispatch(postUserData(obj, history, authtoken));
  }
  if (data?.data?.["activities-floors"]) {
    let floorsArray =[]
    data?.data?.["activities-floors"].forEach((info, index) => {
      let data = {};
      data.category = "floors";
      data.date = info?.dateTime || "";
      data.value = info?.value || 0;
      floorsArray.push(data);
    });
    let obj={
      data: floorsArray
    }
    dispatch(postUserData(obj, history, authtoken));
  }
  if (data?.data?.["activities-distance"]) {
    let distanceArray =[]
    data?.data?.["activities-distance"].forEach((info, index) => {
      console.log('ha ha ha')
      let data = {};
      data.category = "distance";
      data.date = info?.dateTime || "";
      data.value = info?.value || 0;
      distanceArray.push(data);
    });
    let obj={
      data: distanceArray
    }
    dispatch(postUserData(obj, history, authtoken));
  }
  if (data?.data?.["activities-calories"]) {
    let caloriesArray =[]
    data?.data?.["activities-calories"].forEach((info, index) => {
      console.log('hi hi hi');
      let data = {};
      data.category = "calories";
      data.date = info?.dateTime || "";
      data.value = info?.value || 0;
      caloriesArray.push(data);
    });
    let obj={
      data: caloriesArray
    }
    dispatch(postUserData(obj, history, authtoken));
  }
  if(data?.data?.["activities-heart"]){
    let body={
      data: data?.data?.["activities-heart"]
    }
    console.log('body', body);
    dispatch(postHeartData(body, history, authtoken));
  }
  setSyncLoading(false)
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
                    max={moment().format('YYYY-MM-DD')}
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
                    max={moment().format('YYYY-MM-DD')}
                    onChange={handleStartDate}
                  />
                </Form.Group>
                <Form.Group className="form-data-filtering">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    max={moment().format('YYYY-MM-DD')}
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
      <h5 className="mb-3">Sync Data:</h5>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 date_search_area">
              <Form className="form-horizontal-form-wrap">
      
                <Form.Group className="form-data-filtering custom-bottom-margin">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={syncBeforeDate}
                    max={moment().format('YYYY-MM-DD')} 
                    onChange={handleSyncStartDate}
                  />
                </Form.Group>
                <Form.Group className="form-data-filtering">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={syncAfterDate}
                    max={moment().format('YYYY-MM-DD')}
                    onChange={handleSyncEndDate}
                  />
                </Form.Group>
              </Form>{" "}
            </div>
            {syncLoading || syncInfoLoading ? (
              <div className="text-center mt-3">
                <h6>Wait while syncing data...</h6>
              </div>
            ) : (
              <div className="text-center mt-3">
                <Button onClick={handleSyncData}>Sync Data</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadData;
