import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { Badge, Col, Input, Row, Spinner } from "reactstrap";
import * as XLSX from "xlsx";
import { get } from "../../helpers/api_helper";
import { getPermission, getUsers, removeDoctorPermission } from "../../store/User/actions";
import SearchInput from "../Atoms/SearchInput";
import CardComponent from "../Layout/CardComponent";
import CustomTable from "../Layout/CustomTable";
import InnerLayer from "../Layout/InnerLayer";
import NoTableData from "../Layout/NoTableData";
import { Button, Modal } from "react-bootstrap";
const tableHead2 = [
  "No.",

  "Doctor Name",
  "Email",
  "Phone",

  "Action",
  
];

const renderTooltipEdit = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Remove
  </Tooltip>
);


const PermittedDoctor = ({ history }) => {


  let dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(10);
  const [value, setValue] = useState("");
  const handleCloseModal = () => setDeleteModal(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const {  permissionDataLoading, authtoken, role, permissionData,removePermissionLoading } =
    useSelector((state) => ({
     
      permissionData:  state.UserReducer.permissionData,
      permissionDataLoading:  state.UserReducer.permissionDataLoading,
      authtoken: state.Login.token,
      role: state.Login.userrole,
      removePermissionLoading: state.UserReducer.removePermissionLoading,
    }));
console.log('permissionData', permissionData);
 
useEffect(()=>{
  dispatch(getPermission(authtoken, true));
}, [])

const handleDelete = (data) => {
    setDeleteModal(true);

    if (data) {
      setDoctorId(data?._id);
    }
  };
  const handleSubmitDelete = () => {
    console.log("hello");
  
    dispatch(removeDoctorPermission({}, history, authtoken, doctorId));
    setDeleteModal(false);
  };
  return (
    <React.Fragment>
      <InnerLayer
        title="Permitted Doctor"
        wrapperClass="py-3 users"
        isBreadCrumb={true}
        link={"#"}
        mainTitle={"Doctor"}
        subTitle={"Permitted Doctor"}
      
        buttonText="Create New"
        
      >
        <Row>
          <CardComponent className="user_table_card">
            <Row className="mb-2 table-header-padding">
              <div className="d-flex justify-content-end">
                <Col
                 
                  md={2}
                >
                  <Button className="btn btn-warning-outline" onClick={()=>history.push('/doctor')}>Doctor's List</Button>
                  
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
                      
                      <td>{data?.doctor?.name}</td>
                      <td>{data?.doctor?.email}</td>

                      <td>{data?.doctor?.phoneNumber}</td>

               
                     
                        <td>
                       
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipEdit}
                          >
                            <button
                              onClick={() => handleDelete(data)}
                              className="btn btn-outline-danger btn-sm"
                              style={{ borderRadius: "10px" }}
                            >
                              <i className="bx bx-check-square mt-1"></i>
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
        </Row>
      </InnerLayer>
    </React.Fragment>
  );
};

PermittedDoctor.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(PermittedDoctor);
