import { DishValues, FormValues } from "../types/formValues";

export const setValues = (values: FormValues): DishValues => {
  switch (values.type) {
    case "pizza":
      return {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        no_of_slices: Number(values.no_of_slices),
        diameter: Number(values.diameter),
      };
    case "soup":
      return {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        spiciness_scale: Number(values.spiciness_scale),
      };
    case "sandwich":
      return {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        slices_of_bread: Number(values.slices_of_bread),
      };
    default:
      throw new Error(`Unknown dish type: ${values.type}`);
  }
};
