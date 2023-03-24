import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Col, Form, Row, Spinner, Container } from "reactstrap";

import { generateUrl } from "../../store/User/actions";

import CustomInput from "../Common/CustomInput";
import AddCardComponent from "../Layout/AddCardComponent";

import { generateUrlSchema } from "../Schemas/GenerateUrl.schema";

const initialValues = {
  clientId: "",
  clientSecret: "",
  url: "",
};

const GenerateUrl = ({ edit }) => {
  let dispatch = useDispatch();
  const history = useHistory();

  const { authtoken, generateUrlLoading, url, urlLoading } = useSelector(
    (state) => ({
      authtoken: state.Login.token,
      generateUrlLoading: state.UserReducer.generateUrlLoading,
      url: state.UserReducer.url,
      urlLoading: state.UserReducer.urlLoading,
    })
  );

  const onSubmit = (values) => {
    let obj = {};
    obj.clientId = values.clientId?.trim();
    obj.clientSecret = values.clientSecret?.trim();
    obj.url = values.url?.trim();

    dispatch(generateUrl(obj, history, authtoken));
  };

  const generateUrlData = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: generateUrlSchema,
    onSubmit,
  });
  console.log("urlLoading", urlLoading);
  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container>
          <div style={{ minHeight: "100vh" }} className="position-relative ">
            <Row className="mt-4">
              <Col md="9" className="mx-auto">
                {/* add User */}
                <AddCardComponent className="">
                  <h4 className="text-center mb-3 fw-bold">Generate Url</h4>
                  <h5 className="text-center">
                    Please logged in first in this{" "}
                    <a
                      href="https://accounts.fitbit.com/login?targetUrl=https%3A%2F%2Fwww.fitbit.com%2Fglobal%2Fau%2Fhome"
                      target="_blank"
                    >Website</a>{" "}
                    than generateUrl
                  </h5>
                  <Form
                    className="needs-validation col-md-12"
                    onSubmit={generateUrlData.handleSubmit}
                  >
                    <Row>
                      <Col md="12 mb-2">
                        <CustomInput
                          name={"clientId"}
                          type={"text"}
                          label={"Client Id"}
                          placeholder={"Type Client ID"}
                          validationType={generateUrlData}
                        />
                      </Col>

                      {edit ? (
                        <span></span>
                      ) : (
                        <Col md="12 mb-2">
                          <CustomInput
                            name={"clientSecret"}
                            type={"text"}
                            label={"Client Secret"}
                            placeholder={"Type Client Secret"}
                            validationType={generateUrlData}
                          />
                        </Col>
                      )}

                      <Col md="12 mb-2">
                        <CustomInput
                          name={"url"}
                          type={"text"}
                          label={"Url "}
                          placeholder={"Type Url"}
                          validationType={generateUrlData}
                        />
                      </Col>
                    </Row>

                    {generateUrlLoading ? (
                      <div className="d-flex justify-content-end mt-3">
                        <Spinner className="ms-2" color="primary" />
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end mt-3">
                        <input
                          type="submit"
                          value={"Generate Url"}
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

export default GenerateUrl;
