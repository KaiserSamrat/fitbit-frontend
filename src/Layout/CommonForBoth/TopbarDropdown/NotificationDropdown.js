import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import bulletPoint from '../../../assests/images/Ellipse 2.svg'
import {
  getNotification,
  updateNotification,
} from "../../../store/Dashboard/action";
//Import images
import {
  default as avatar3,
  default as avatar4,
} from "../../../assests/images/users/avatar-1.jpg";
import moment from "moment";

const NotificationDropdown = (props) => {
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { notificationData, authtoken } = useSelector((state) => ({
    authtoken: state.Login.token,
    notificationData: state.DashboardReducer.notificationData,
  }));

  useEffect(() => {
    dispatch(getNotification(authtoken));
  }, []);
  let count = 0;
  notificationData?.data?.data?.map((data) => {
    if (data?.seen === false) {
      count++;
    }
  
  });
  console.log("notificationData", notificationData);
  console.log(count);
  const handleNotification = (data) => {
    let body = {
      seen: true,
    };
    dispatch(updateNotification(body, history, authtoken, data?._id));

    history.push(`/notification-challan/${data?.challanId}`);
  };
  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge badge-danger badge-pill">
            {count}
          </span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 notification-dropdown" right style={{width:"400px"}}>
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {"Notifications"} </h6>
              </Col>
              <div className="col-auto">
                <a href="#!" className="small">
                  View All
                </a>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {(notificationData?.data?.data || []).map((data, key) => {
              return (
                <>
                  <div className={data?.seen !== true ? "notification-inner-area" : ""}>
                  <div className="media notification-info" onClick={() => handleNotification(data)}>
                
                    <div className="avatar-xs me-3">
                      <span className="avatar-title rounded-circle font-size-16" style={{background:"#E5ECF2"}}>
                        <i className="bx bx-bell"  style={{color:"black"}}/>
                      </span>
                    </div>
                    {
                      data?.seen !== true ? <img src={bulletPoint} alt="icon" className="bullet-icon" /> : <span></span>
                    }
                    
                    <div
                      className="media-body"
                      
                    >
                      <h6 className="mt-0 mb-3">{data?.description}</h6>
                      <p>{moment(data?.createdAt).format(
                          "MMMM Do YYYY"
                        )}</p>
                    </div>
                    </div>
                  </div>
                </>
              );
            })}
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default NotificationDropdown;
