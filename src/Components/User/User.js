import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../helpers/api_helper";
import { getPermission, getUsers } from "../../store/User/actions";
import SearchInput from "../Atoms/SearchInput";
import CardComponent from "../Layout/CardComponent";
import CustomTable from "../Layout/CustomTable";
import InnerLayer from "../Layout/InnerLayer";
import NoTableData from "../Layout/NoTableData";

const tableHead2 = [
  "No.",

  "User Name",
  "Email",
  "Phone",

  "Action",
  
];

const renderTooltipEdit = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View Details
  </Tooltip>
);


const User = ({ history }) => {


  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [value, setValue] = useState("");

  const { users, permissionDataLoading, authtoken, role, getUserLoading, permissionData, } =
    useSelector((state) => ({
      users: state.UserReducer.users,

      getUserLoading: state.UserReducer.getUserLoading,
      permissionData:  state.UserReducer.permissionData,
      permissionDataLoading:  state.UserReducer.permissionDataLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
    }));
console.log('permissionData', permissionData);
  let totalPageNumber = Math.ceil(users?.users?.length / pageRange);
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (value !== "") {
  //       console.log("value", value);
  //       dispatch(getUsers(authtoken, "DOCTOR", value, currentPage, pageRange));
  //     }
  //   }, 1000);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [value]);
  // useEffect(() => {
  //   dispatch(getUsers(authtoken, "USER", value, currentPage, pageRange));
  // }, [currentPage, pageRange, value]);


  const handleRange = (e) => {
    setPageRange(e.target.value);
  };
useEffect(()=>{
  dispatch(getPermission(authtoken));
}, [])


  return (
    <React.Fragment>
      <InnerLayer
        title="User List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"User"}
        subTitle={"user List"}
      
        buttonText="Create New"
        
      >
        <Row>
          <CardComponent className="user_table_card">
            <Row className="mb-2 table-header-padding">
              <div className="d-flex justify-content-end">
                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={2}
                >
                  
                </Col>
         

            
              </div>
            </Row>

            {/* table */}
            <Row>
              <CustomTable
                paginationClass="paginationContainer text-right"
                data={permissionData?.data}
                // pageNo={users?.pagenumber}
                tableHead={tableHead2}
                
              >
                {permissionDataLoading ? (
                  <tr style={{ width: "100%" }}>
                    <div
                      className="text-center my-5 py-5 d-flex justify-content-center w-100 h-100"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Spinner animation="border" variant="primary" />
                      </div>
                    </div>
                  </tr>
                ) : permissionData?.data?.length > 0 ? (
                  permissionData?.data?.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>
                      
                      <td>{data?.patient?.name}</td>
                      <td>{data?.patient?.email}</td>

                      <td>{data?.patient?.phoneNumber}</td>

               
                     
                        <td>
                       
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipEdit}
                          >
                            <button
                              onClick={() => {
                                history.push(`/patient-data/${data?.patient?._id}`);
                              }}
                              className="btn btn-outline-info btn-sm"
                              style={{ borderRadius: "10px" }}
                            >
                              <i className="bx bx-edit mt-1"></i>
                            </button>
                          </OverlayTrigger>
                        </td>
                      
                    </tr>
                  ))
                ) : (
                  <NoTableData
                    colSpan=""
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "300px", width: `100%` }}
                  >
                    <span>No data Available</span>
                  </NoTableData>
                )}
              </CustomTable>
              {/* table end */}
            </Row>
          </CardComponent>

        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

User.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(User);
