import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../helpers/api_helper";
import { getAdminExtendToken, getPermission, getUsers, giveDoctorPermission } from "../../store/User/actions";
import SearchInput from "../Atoms/SearchInput";
import CardComponent from "../Layout/CardComponent";
import CustomTable from "../Layout/CustomTable";
import InnerLayer from "../Layout/InnerLayer";
import NoTableData from "../Layout/NoTableData";
import { Button, Modal } from "react-bootstrap";
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
  const [pageRange, setPageRange] = useState(100);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [patientId, setPatientId] = useState("");
  const handleClose = () => setShow(false);
  const { users, permissionLoading, authtoken, role, getUserLoading, permissionData,LoginId } =
    useSelector((state) => ({
      users: state.UserReducer.users,
      LoginId: state.Login.loginId,
      getUserLoading: state.UserReducer.getUserLoading,
      permissionData:  state.UserReducer.permissionData,
      permissionDataLoading:  state.UserReducer.permissionDataLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
      permissionLoading: state.UserReducer.permissionLoading,
    }));
console.log('users', users);
  
useEffect(() => {
    
  dispatch(getAdminExtendToken(authtoken));


}, []);

const handleShow = (data) => {
  setShow(true);

  if (data) {
    setPatientId(data?._id);
  }
};
useEffect(() => {
  dispatch(getUsers(authtoken, "USER", value, currentPage, pageRange));
}, [currentPage, pageRange, value]);
const handleSubmit = () => {
  
  let body = {
    patient: patientId,
    doctor: LoginId,
  };
  dispatch(giveDoctorPermission(body, history, authtoken));
  setShow(false);
};
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
                data={users?.data}
                // pageNo={users?.pagenumber}
                tableHead={tableHead2}
                
              >
                {getUserLoading ? (
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
                ) : users?.data?.length > 0 ? (
                  users?.data?.map((data, idx) => (
                    <tr>
                      <th scope="row" style={{ paddingLeft: "25px" }}>
                        {idx + 1}
                      </th>
                      
                      <td>{data?.name}</td>
                      <td>{data?.email}</td>

                      <td>{data?.phoneNumber}</td>

               
                     
                        <td>
                       
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipEdit}
                          >
                            <button
                           onClick={() => handleShow(data)}
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
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body className="text-center">
            <div className="mb-4">
              {/* <img src="" alt="Image" style={{ width: "76px" }} /> */}
            </div>
            <h5>Are you want to request this permission?</h5>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "none", justifyContent: "center" }}
            className="mb-4"
          >
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              style={{ width: "112px" }}
            >
              Cancel
            </Button>
            {permissionLoading ? (
              <div className="d-flex justify-content-end mt-3">
                <Spinner className="ms-2" color="primary" />
              </div>
            ) : (
              <Button className="btn button" onClick={handleSubmit}>
                Yes, I’m Sure
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </InnerLayer>
    </React.Fragment>
  );
};

User.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(User);
