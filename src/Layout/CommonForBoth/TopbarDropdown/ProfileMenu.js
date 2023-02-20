import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { logoutUser } from "../../../store/actions";

const ProfileMenu = ({ history }) => {
  // Declare a new state variable, which we'll call "menu"
  const { userrole, name } = useSelector((state) => ({
    ...state.Login,
    name: state.Login.name,
  }));
  const [menu, setMenu] = useState(false);
  let dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser(history));
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          /> */}
        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
              <span onClick={() => handleLogout()}>{"Logout"}</span>
        </DropdownToggle>
        <DropdownMenu right>
          {/* <span className="dropdown-item">
            <i className="bx bx-cog font-size-16" />
            <span>{"Settings"}</span>
          </span> */}
          <div className="dropdown-divider" />
          <span className="dropdown-item" onClick={() => handleLogout()}>
            <Link to="#" className="text-black">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
              <span>{"Logout"}</span>
            </Link>
          </span>
        </DropdownMenu>
      
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
