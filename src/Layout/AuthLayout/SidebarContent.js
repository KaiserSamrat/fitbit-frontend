/* eslint-disable jsx-a11y/role-supports-aria-props */
// MetisMenu
import MetisMenu from "metismenujs";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// //Import Scrollbar
import SimpleBar from "simplebar-react";
import boxAdd from "../icon/box-add.svg";
import box from "../icon/box.svg";
import cube from "../icon/cube.svg";
import icon1 from "../icon/dashboard.svg";
import gps from "../icon/gps.svg";
import hub from "../icon/hub.svg";
import icon5 from "../icon/location.svg";
import profileCircle from "../icon/profile-circle.svg";
import challan from "../icon/receipt-item.svg";
import reconcil from "../icon/reconcil.svg";
import triangle from "../icon/triangle.svg";

const SidebarContent = (props) => {
  const ref = useRef();
  const { userrole } = useSelector((state) => ({
    userrole: state.Login.userrole,
  }));

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;
    const initMenu = () => {
      const splitMain = pathName?.split("/");
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        const spitPath = items[i].pathname.split("/");
        if (
          pathName === items[i].pathname ||
          splitMain?.[1] === spitPath?.[1]
        ) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{"Menu"} </li>
            {userrole === "USER" ? (
              <li>
                <Link to="/dashboard" className="">
                  <i>
                    <img src={icon1} alt="icon" />
                  </i>
                  <span>{"Dashboard"}</span>
                </Link>
              </li>
            ) : null}

            {/* info */}

            {/* {userrole === "USER" ? (
              <React.Fragment>
                <li>
                  <Link to="/doctor"  className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Doctors"}</span>
               
                  </Link>
                </li>
            
              </React.Fragment>
            ) : null} */}
            {userrole === "USER" ? (
              <React.Fragment>
                <li>
                  <Link to="/permitted-doctor" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Permitted Doctors"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {userrole === "DOCTOR" ? (
              <React.Fragment>
                <li>
                  <Link to="/user" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"User List"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {userrole === "DOCTOR" ? (
              <React.Fragment>
                <li>
                  <Link to="/permitted-user" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Permitted User"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {/* hub */}
            {userrole === "USER" ? (
              <React.Fragment>
                <li>
                  <Link to="/generate-url" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Generate url"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {userrole === "USER" ? (
              <React.Fragment>
                <li>
                  <Link to="/data-download" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Download Data"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {userrole === "ADMIN" ? (
              <React.Fragment>
                <li>
                  <Link to="/user-list" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"User"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {userrole === "ADMIN" ? (
              <React.Fragment>
                <li>
                  <Link to="/sync-data" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Sync data"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {userrole === "ADMIN" ? (
              <React.Fragment>
                <li>
                  <Link to="/permitted-doc" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Permitted Doctor"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}
            {/* <React.Fragment>
                <li>
                  <Link to="/fitbit-data"  className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Fitbit Data"}</span>
                
                  </Link>
                </li>
            
              </React.Fragment>
  */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
