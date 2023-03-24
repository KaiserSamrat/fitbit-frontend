import * as Yup from "yup";
export const createUserSchema = Yup.object().shape({
  name: Yup.string().required("This value is required"),
  password: Yup.string().required("This value is required").min(8,"Minimum 8 Character required"),
  passwordConfirm: Yup.string().required("This value is required").min(8,"Minimum 8 Character required").oneOf([Yup.ref("password"),null],"Password Not Matched"),
  
  phoneNumber: Yup.string().required("This value is required"),
  
});
