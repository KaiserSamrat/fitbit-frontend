import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Col,
  Form,

  Row,
 
  Spinner,
  Container,
} from "reactstrap";


import { addUser, getSingleUser } from "../../store/User/actions";

import CustomInput from "../Common/CustomInput";
import AddCardComponent from "../Layout/AddCardComponent";

import { addUserSchema } from "../Schemas/AddUser.schema";


const initialValues = {
  name: "", 
  password: "",
  passwordConfirm: "",
  role: "",
  phoneNumber: "",
};
const roleType = [
  {
    name: "Admin",
    _id: 2,
    value: "ADMIN",
  },
  {
    name: "User",
    _id: 2,
    value: "USER",
  },

  {
    name: "Doctor",
    _id: 2,
    value: "DOCTOR",
  },

 

];


const AddUser = ({ edit }) => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const {
    authtoken,
    addingUser,
   
  } = useSelector((state) => ({
   
    authtoken: state.Login.token,
    addingUser: state.UserReducer.addingUser,
    
  }));
   



  const onSubmit = (values) => {
    let obj = {};
    obj.name = values.name; 
    obj.role = values.role;
    obj.phoneNumber = values.phoneNumber;
   obj.email = values.email
    obj.password = values.password;
    obj.passwordConfirm = values.passwordConfirm;
    console.log('obj', obj);

      dispatch(addUser(obj, history, authtoken));
   
   
  };

  const AddUser = useFormik({
    enableReinitialize: true,
    initialValues:  initialValues,
    validationSchema: addUserSchema,
    onSubmit,
  });

  








  return (
    <React.Fragment>
 
       <div className="my-5 pt-sm-5">
       <Container>
        <div style={{ minHeight: "100vh" }} className="position-relative ">
         
         <Row className="mt-4">
           
           <Col md="9" className="mx-auto">
             {/* add User */}
             <AddCardComponent className="">
             <h5 className="mb-3 mt-2">Sign Up</h5>
               <Form
                 className="needs-validation col-md-12"
                 onSubmit={AddUser.handleSubmit}
               >
                 <Row>
                   <Col md="6 mb-2">
                     <CustomInput
                       name={"name"}
                       type={"text"}
                       label={"Name"}
                       placeholder={"Type name"}
                       validationType={AddUser}
                     />
                   </Col>
               
                   {edit ? (
                     <span></span>
                   ) : (
                     <Col md="6 mb-2">
                       <CustomInput
                         name={"email"}
                         type={"text"}
                         label={"Email"}
                         placeholder={"example@gmail.com"}
                         validationType={AddUser}
                       />
                     </Col>
                   )}

                   <Col md="6 mb-2">
                     <CustomInput
                       name={"phoneNumber"}
                       type={"text"}
                       label={"Phone no."}
                       placeholder={"Type Phone No"}
                       validationType={AddUser}
                     />
                   </Col>
                   <Col md="6 mb-2">
                     <CustomInput
                       name={"role"}
                       type={"select"}
                       label={"Select Role"}
                       validationType={AddUser}
                       
                     >
                       <option defaultValue>Select Role...</option>
                       {roleType.length > 0 ? (
                         roleType.map((data, idx) => (
                           <option value={data?.value} key={idx}>
                             {data.name}
                           </option>
                         ))
                       ) : (
                         <span></span>
                       )}
                     </CustomInput>
                   </Col>
             

                   {edit ? (
                     <span></span>
                   ) : (
                     <Col md="6 mb-2">
                       <CustomInput
                         name={"password"}
                         type={"text"}
                         label={"Password"}
                         placeholder={"********"}
                         validationType={AddUser}
                       />
                     </Col>
                   )}
                   {edit ? (
                     <span></span>
                   ) : (
                     <Col md="6 mb-2">
                       <CustomInput
                         name={"passwordConfirm"}
                         type={"text"}
                         label={"Confirm Password"}
                         placeholder={"********"}
                         validationType={AddUser}
                       />
                     </Col>
                   )}
                      
                 </Row>
              
                 {addingUser ? (
                     <div className="d-flex justify-content-end mt-3">
                       <Spinner className="ms-2" color="primary" />
                     </div>
                   ) : (
                   <div className="d-flex justify-content-end mt-3">
                     <input
                       type="submit"
                       value={edit ? "Update User" : "Sign Up"}
                       className="btn button "
                     />
                   </div>
                   )}
            
               </Form>
             </AddCardComponent>
         
         
           </Col>
         </Row>
       </div>
        </Container>
       </div>
     
    </React.Fragment>
  );
};

export default AddUser;
