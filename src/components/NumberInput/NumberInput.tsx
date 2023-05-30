import { ErrorMessage, FieldProps } from "formik";
import styles from "./NumberInput.module.scss";

interface NumberInputProps extends FieldProps {
  label: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ field, form, ...props }) => {
  return (
    <div className={styles.thumb}>
      <div className={styles.thumb__input_thumb}>
        <label
          className={styles.thumb__input_label}
          htmlFor={props.id || field.name}
        >
          {props.label}
        </label>
        <input type="number" {...field} {...props} />
      </div>

      <ErrorMessage
        component="div"
        name={field.name}
        className={styles.validation_error}
      />
    </div>
  );
};

export default NumberInput;
