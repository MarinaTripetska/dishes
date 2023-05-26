import React from "react";
import { Formik, Form, Field } from "formik";
import { validationSchema } from "./validationSchema";

type FormValues = {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich";
  no_of_slices?: number;
  diameter: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
};

const initialValues: FormValues = {
  name: "",
  preparation_time: "",
  type: "pizza",
  no_of_slices: 0,
  diameter: 0.0,
  spiciness_scale: 1,
  slices_of_bread: 1,
};

const DishesForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setTimeout(() => console.log(values), 3000);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, errors, touched, isValid }) => (
        <Form>
          {isSubmitting && <div>Submitting form...</div>}

          <div>
            <label htmlFor="name">Provide dishes name</label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Capricciosa pizza"
            />

            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </div>

          <div>
            <label htmlFor="preparation_time">Preparation time</label>
            <Field
              id="preparation_time"
              name="preparation_time"
              type="text"
              placeholder="00:00:00"
            />

            {errors.preparation_time && touched.preparation_time ? (
              <div>{errors.preparation_time}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="type">Type</label>
            <Field id="type" name="type" as="select">
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </Field>

            {errors.type && touched.type ? <div>{errors.type}</div> : null}
          </div>

          {values.type === "pizza" && (
            <div>
              <div>
                <label htmlFor="no_of_slices">Number of slices</label>
                <Field id="no_of_slices" name="no_of_slices" type="number" />

                {errors.no_of_slices && touched.no_of_slices ? (
                  <div>{errors.no_of_slices}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="diameter">Diameter</label>
                <Field id="diameter" name="diameter" type="number" step="0.1" />

                {errors.diameter && touched.diameter ? (
                  <div>{errors.diameter}</div>
                ) : null}
              </div>
            </div>
          )}

          {values.type === "soup" && (
            <div>
              <label htmlFor="spiciness_scale">Spiciness scale</label>
              <Field
                id="spiciness_scale"
                name="spiciness_scale"
                type="number"
                min="1"
                max="10"
              />

              {errors.spiciness_scale && touched.spiciness_scale ? (
                <div>{errors.spiciness_scale}</div>
              ) : null}
            </div>
          )}

          {values.type === "sandwich" && (
            <div>
              <label htmlFor="slices_of_bread">Slices of bread</label>
              <Field
                id="slices_of_bread"
                name="slices_of_bread"
                type="number"
                min="1"
                max="100"
              />

              {errors.slices_of_bread && touched.slices_of_bread ? (
                <div>{errors.slices_of_bread}</div>
              ) : null}
            </div>
          )}

          <button type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DishesForm;
