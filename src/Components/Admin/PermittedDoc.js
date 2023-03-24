import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../helpers/api_helper";
import { getPermission, getUsers, giveDoctorPermission, removeDoctorPermission, updateDoctorPermission } from "../../store/User/actions";
import SearchInput from "../Atoms/SearchInput";
import CardComponent from "../Layout/CardComponent";
import CustomTable from "../Layout/CustomTable";
import InnerLayer from "../Layout/InnerLayer";
import NoTableData from "../Layout/NoTableData";
import { Button, Modal } from "react-bootstrap";
const tableHead = ["No.", "Name", "Phone", "Role", "Email", "Action"];

const renderTooltipEdit = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Cancel
  </Tooltip>
);
const renderTooltipView = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View
  </Tooltip>
);

const PermittedDoc = ({ history }) => {
  const [userList, setUser] = useState("Central Warehouse");
  var useremployee = "";

  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(20);
  const [value, setValue] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseModal = () => setDeleteModal(false);
  const handleShow = (data) => {
    setShow(true);

    if (data) {
      setDoctorId(data?._id);
    }
  };
  const handleDelete = (data) => {
    setDeleteModal(true);

    if (data) {
      setDoctorId(data?._id);
    }
  };

  const { users, permissionLoading, authtoken, role, LoginId, permissionDataLoading, removePermissionLoading, permissionData } =
    useSelector((state) => ({
      users: state.UserReducer.users,

      getUserLoading: state.UserReducer.getUserLoading,
      LoginId: state.Login.loginId,
      authtoken: state.Login.token,
      role: state.Login.userrole,
      permissionData:  state.UserReducer.permissionData,
      permissionDataLoading:  state.UserReducer.permissionDataLoading,
      permissionLoading: state.UserReducer.permissionLoading,
      removePermissionLoading: state.UserReducer.removePermissionLoading,
    }));
    console.log('permissionData', permissionData);
  const [roleList, setRole] = useState(role);
  let totalPageNumber = Math.ceil(users?.length / pageRange);
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (value !== "") {
  //       console.log("value", value);
  //       dispatch(getUsers(authtoken, roleList, value, currentPage, pageRange));
  //     }
  //   }, 1000);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [value]);
  // useEffect(() => {
  //   dispatch(getUsers(authtoken, "DOCTOR", value, currentPage, pageRange));
  // }, [currentPage, pageRange, roleList, value]);
  useEffect(()=>{
    
      dispatch(getPermission(authtoken, false))
   
    
  },[])

  console.log("users", users);
  const handleRange = (e) => {
    setPageRange(e.target.value);
  };
  const handleSubmit = () => {
    console.log("hello");
    let body = {
      permitted : true
    };
    dispatch(updateDoctorPermission(body, history, authtoken, doctorId));
    setShow(false);
  };
  const handleSubmitDelete = () => {
    console.log("hello");
    let body = {
      patient: LoginId,
      doctor: doctorId,
    };
    dispatch(removeDoctorPermission(body, history, authtoken, doctorId));
    setDeleteModal(false);
  };

  return (
    <React.Fragment>
      <InnerLayer
        title="Doctor List"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Doctor"}
        subTitle={"Doctor List"}
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
                  <div className="search-box  d-flex justify-content-end justify-content-start">
                    <SearchInput
                      className="userSearchBar form-control search-width2"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search User ID"
                    />
                  </div>
                  
              
                </Col>

                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={2}
                >
                  <Input type="select" onChange={(e) => handleRange(e)}>
                    {/* <option defaultValue>Select...</option> */}
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Input>
                </Col>
                <Col
                  className="me-2 responsive-margin custom-bottom-margin"
                  md={2}
                >
                 <Button className=" btn btn-warning-outline" onClick={()=>history.push('/permitted-doctor')}>Permitted Doctor</Button>
                </Col>
              </div>
            </Row>

            {/* table */}
            <Row>
              <CustomTable
                paginationClass="paginationContainer text-right"
                data={users?.data}
                pageNo={totalPageNumber}
                tableHead={tableHead}
                setCurrentPage={setCurrentPage}
                isPagination
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
                      <td>{data?.doctor?.name}</td>

                      <td>{data?.doctor?.name}</td>

                      <td>Doctor</td>
                      <td>{data?.doctor?.email}</td>

                      <td>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltipView}
                        >
                          <button
                            className="btn btn-secondary btn-sm me-2"
                            style={{ borderRadius: "10px" }}
                            onClick={() => handleShow(data)}
                          >
                            <i className="bx bx-show mt-1"></i>
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
            <h5>Are you want to give this permission?</h5>
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
        <Modal show={deleteModal} onHide={handleCloseModal} centered>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body className="text-center">
            <div className="mb-4">
              {/* <img src="" alt="Image" style={{ width: "76px" }} /> */}
            </div>
            <h5>Are you want to remove this permission?</h5>
          </Modal.Body>
          <Modal.Footer
            style={{ borderTop: "none", justifyContent: "center" }}
            className="mb-4"
          >
            <Button
              variant="outline-secondary"
              onClick={handleCloseModal}
              style={{ width: "112px" }}
            >
              Cancel
            </Button>
            {removePermissionLoading ? (
              <div className="d-flex justify-content-end mt-3">
                <Spinner className="ms-2" color="primary" />
              </div>
            ) : (
              <Button className="btn button" onClick={handleSubmitDelete}>
                Yes, I’m Sure
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </InnerLayer>
    </React.Fragment>
  );
};

PermittedDoc.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(PermittedDoc);
