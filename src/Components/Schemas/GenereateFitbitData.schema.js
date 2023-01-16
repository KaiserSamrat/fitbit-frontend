import * as Yup from "yup";
export const generateFitbitDataSchema = Yup.object().shape({
    secretToken: Yup.string().required("This value is required"),
   
  
});
