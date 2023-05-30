import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  preparation_time: Yup.string()
    .matches(/^(\d{2}):(\d{2}):(\d{2})$/, "Invalid time format")
    .required("Required"),
  type: Yup.string().oneOf(["pizza", "soup", "sandwich"]).required("Required"),
  no_of_slices: Yup.number().when("type", {
    is: "pizza",
    then: (schema) =>
      schema.min(1, "1 is minimum of spiciness scale").required("Required"),
  }),
  diameter: Yup.number().when("type", {
    is: "pizza",
    then: (schema) =>
      schema.min(0.1, "0.1 is minimum of spiciness scale").required("Required"),
  }),
  spiciness_scale: Yup.number().when("type", {
    is: "soup",
    then: (schema) =>
      schema
        .min(1, "1 is minimum of spiciness scale")
        .max(10, "10 is maximum of spiciness scale")
        .required("Required"),
  }),
  slices_of_bread: Yup.number().when("type", {
    is: "sandwich",
    then: (schema) =>
      schema
        .min(1, "1 is minimum slices of bread")
        .max(100, "100 is maximum slices of bread")
        .required("Required"),
  }),
});
