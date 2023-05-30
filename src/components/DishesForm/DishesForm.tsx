import React from "react";
import { Formik, Form, Field } from "formik";
import { validationSchema } from "./validationSchema";
import { FormValues } from "../../types/formValues";
import { createDish } from "../../API/dishes/create";
import styles from "./DishesForm.module.scss";
import Dropdown from "../Dropdown";
import NumberInput from "../NumberInput/NumberInput";

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
          const response = await createDish(values);

          if (!response.ok) {
            const error = await response.json();
            console.log(error);
            setErrors(error);
            setIsResponseError(true);
          } else {
            const data = await response.json();
            console.log("success POST: ", data);
            resetForm();
            console.log(values);
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
          setTimeout(() => setIsResponseError(true), 3000);
        }
      }}
    >
      {({ values, isSubmitting, errors, touched, isValid, dirty }) => (
        <Form className={styles.form}>
          <div className={styles.form__images}></div>

          <div className={styles.form__content}>
            <h1 className={styles.form__title}>Order dish form</h1>

            <div className={styles.form__top_thumb}>
              <div>
                <div className={styles.form__input_group}>
                  <div className={styles.form__input}>
                    <label htmlFor="name">Dishes name</label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Capricciosa pizza"
                    />
                  </div>
                  {errors.name && touched.name ? (
                    <p className={styles.validation_error}>{errors.name}</p>
                  ) : null}
                </div>

                <div className={styles.form__input_group}>
                  <div className={styles.form__input}>
                    <label htmlFor="preparation_time">Preparation time</label>
                    <Field
                      id="preparation_time"
                      name="preparation_time"
                      type="text"
                      placeholder="00:00:00"
                    />

                    {errors.preparation_time && touched.preparation_time ? (
                      <p className={styles.validation_error}>
                        {errors.preparation_time}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className={styles.form__input_group}>
                <div>
                  <label htmlFor="type">Type</label>
                  <Field
                    component={Dropdown}
                    name="type"
                    id="type"
                    options={[
                      { value: "pizza", label: "Pizza" },
                      { value: "soup", label: "Soup" },
                      { value: "sandwich", label: "Sandwich" },
                    ]}
                  />
                </div>

                {errors.type && touched.type ? (
                  <p className={styles.validation_error}>{errors.type}</p>
                ) : null}
              </div>
            </div>

            {values.type === "pizza" && (
              <div>
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
              </div>
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
            <button
              type="submit"
              className={styles.form__submit}
              disabled={isSubmitting || !(dirty && isValid)}
            >
              Submit
            </button>
            {isSubmitting && <div>Submitting form...</div>}

            {/* Response validation errors: */}
            {isResponseError && Object.keys(errors).length > 0 && (
              <div className={styles.form__error}>
                <h3>Errors:</h3>
                <ul>
                  {Object.keys(errors).map((key, i) => (
                    <li key={i}>
                      {key}: {errors[key as keyof FormValues]}
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
