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
    <div className={styles.numberInput}>
      <div>
        <label htmlFor={props.id || field.name}>{props.label}</label>
        <input type="number" {...field} {...props} />
      </div>

      <ErrorMessage
        component="div"
        name={field.name}
        className={styles.errorText}
      />
    </div>
  );
};

export default NumberInput;
