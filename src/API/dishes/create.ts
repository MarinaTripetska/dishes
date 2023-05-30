import { FormValues } from "../../types/formValues";

export const createDish = async (values: FormValues) => {
  const setValues = (values: FormValues) => {
    if (values.type === "pizza") {
      return {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        no_of_slices: Number(values.no_of_slices),
        diameter: Number(values.diameter),
      };
    } else if (values.type === "soup") {
      return {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        spiciness_scale: Number(values.spiciness_scale),
      };
    } else if (values.type === "sandwich") {
      return {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        slices_of_bread: Number(values.slices_of_bread),
      };
    }
  };
  const response = await fetch(
    "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(setValues(values)),
    }
  );
  return response;
};
