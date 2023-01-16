import * as Yup from "yup";
export const generateUrlSchema = Yup.object().shape({
    clientId: Yup.string().required("This value is required"),
    clientSecret: Yup.string().required("This value is required"),
    url: Yup.string().required("This value is required"),
  
});
