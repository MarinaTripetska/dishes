import { FormValues } from "../../types/formValues";

export const createDish = async (values: FormValues) => {
  const response = await fetch(
    "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  return response;
};