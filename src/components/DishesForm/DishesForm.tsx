import React from "react";
import { Formik, Form, Field } from "formik";

import { DishValues, FormValues } from "../../types/formValues";
import { createDish } from "../../API/dishes/create";

import Dropdown from "../Dropdown";
import NumberInput from "../NumberInput";
import TextInput from "../TextInput";

import { validationSchema } from "./validationSchema";
import styles from "./DishesForm.module.scss";
import { setValues } from "../../utils/setValues";

const initialValues: FormValues = {
  name: "",
  preparation_time: "",
  type: "pizza",
  no_of_slices: "",
  diameter: "",
  spiciness_scale: "",
  slices_of_bread: "",
};

const DishesForm: React.FC = () => {
  const [isResponseError, setIsResponseError] = React.useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true);

        try {
          const response = await createDish(setValues(values));

          if (!response.ok) {
            const error = await response.json();
            setErrors(error);
            setIsResponseError(true);
          } else {
            const data = await response.json();
            console.log("success POST: ", data);
            resetForm();
          }
        } catch (error) {
          console.error("Error: ", error);
        } finally {
          setSubmitting(false);
          setTimeout(() => setIsResponseError(false), 5000);
        }
      }}
    >
      {({ values, isSubmitting, errors, isValid, dirty }) => (
        <Form className={styles.form}>
          <div className={styles.form__images}></div>

          <div className={styles.form__content}>
            <h1 className={styles.form__title}>Order dish form</h1>

            <div className={styles.form__top_thumb}>
              <div>
                <Field
                  id="name"
                  name="name"
                  label="Dishes name"
                  placeholder="Capricciosa pizza"
                  component={TextInput}
                />

                <Field
                  id="preparation_time"
                  name="preparation_time"
                  label="Preparation time"
                  placeholder="00:00:00"
                  component={TextInput}
                />
              </div>

              <div className={styles.form__input_group}>
                <Field
                  component={Dropdown}
                  name="type"
                  id="type"
                  label="Type"
                  options={[
                    { value: "pizza", label: "Pizza" },
                    { value: "soup", label: "Soup" },
                    { value: "sandwich", label: "Sandwich" },
                  ]}
                />
              </div>
            </div>

            <div className={styles.form__bottom_thumb}>
              {values.type === "pizza" && (
                <>
                  <Field
                    id="no_of_slices"
                    name="no_of_slices"
                    label="Number of slices"
                    placeholder="8"
                    min="1"
                    component={NumberInput}
                  />

                  <Field
                    id="diameter"
                    name="diameter"
                    label="Diameter"
                    placeholder="3.5"
                    min="0.1"
                    step="0.1"
                    component={NumberInput}
                  />
                </>
              )}

              {values.type === "soup" && (
                <Field
                  id="spiciness_scale"
                  name="spiciness_scale"
                  label="Spiciness scale"
                  min="1"
                  max="10"
                  component={NumberInput}
                />
              )}

              {values.type === "sandwich" && (
                <Field
                  id="slices_of_bread"
                  name="slices_of_bread"
                  label="Slices of bread"
                  min="1"
                  max="100"
                  placeholder="2"
                  component={NumberInput}
                />
              )}
            </div>

            <button
              type="submit"
              className={styles.form__submit}
              disabled={isSubmitting || !(dirty && isValid)}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {/* Response validation errors: */}
            {isResponseError && Object.keys(errors).length > 0 && (
              <div className={styles.form__error}>
                <h3>Errors:</h3>
                <ul>
                  {Object.keys(errors).map((key, i) => (
                    <li key={i}>
                      {key}: {errors[key as keyof DishValues]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DishesForm;
