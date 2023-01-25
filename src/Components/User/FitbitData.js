import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Col, Form, Row, Spinner, Container } from "reactstrap";

import { generateFitbitData } from "../../store/User/actions";


import CustomInput from "../Common/CustomInput";
import AddCardComponent from "../Layout/AddCardComponent";

import { generateFitbitDataSchema } from "../Schemas/GenereateFitbitData.schema";
import XLSX from "xlsx"
import { toast } from "react-toastify";
const initialValues = {
    secretToken: "",

};

const FitbitData = ({ edit }) => {
  let dispatch = useDispatch();
  const history = useHistory();
  const [fitbitLoading, setFitbitLoading] = useState(false)

  const { authtoken, fitbitDataLoading, url, urlLoading } = useSelector((state) => ({
    authtoken: state.Login.token,
    fitbitDataLoading: state.UserReducer.fitbitDataLoading,
    url: state.UserReducer.url,
    urlLoading: state.UserReducer.urlLoading,
   
  }));

  const onSubmit = (values) => {
    setFitbitLoading(true)
    let obj = {};
    obj.secretToken = values.secretToken;
   
    dispatch(generateFitbitData(obj, history, authtoken));
  };

  const generateFitbitDataInfo = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: generateFitbitDataSchema,
    onSubmit,
  });

  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container>
          <div style={{ minHeight: "100vh" }} className="position-relative ">
            <Row className="mt-4">
              <Col md="9" className="mx-auto">
              {
                    urlLoading && <AddCardComponent>
                    <Row>
                      <Col md={12}>
                        <h5 className="mb-3 text-center">Generated fitbit Url</h5>
                        <a href={url} target="_blank">{url}</a>
                      </Col>
                    </Row>
                  </AddCardComponent>
                }
                {/* add User */}
                <AddCardComponent className="">
                  <h5 className="mb-4 text-center mt-2">Secret Token</h5>
                  <Form
                    className="needs-validation col-md-12"
                    onSubmit={generateFitbitDataInfo.handleSubmit}
                  >
                    <Row>
                      <Col md="12 mb-2">
                        <CustomInput
                          name={"secretToken"}
                          type={"text"}
                          label={"Token"}
                          placeholder={"Type Token"}
                          validationType={generateFitbitDataInfo}
                        />
                      </Col>

              
                    </Row>
                    {fitbitDataLoading ? (
                      <div className="d-flex justify-content-end mt-3">
                        <Spinner className="ms-2" color="primary" />
                      </div>
                    ) : (
                
                      <div className="d-flex justify-content-end mt-3">
                        <input
                          type="submit"
                          value={"Generate Data"}
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

export default FitbitData;
