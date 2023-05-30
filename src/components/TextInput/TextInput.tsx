import { ErrorMessage, FieldProps } from "formik";
import styles from "./TextInput.module.scss";

interface TextInputProps extends FieldProps {
  label: string;
  id?: string;
}

const TextInput: React.FC<TextInputProps> = ({ field, form, ...props }) => {
  return (
    <div className={styles.input}>
      <div>
        <label htmlFor={props.id || field.name}>{props.label}</label>
        <input type="text" {...field} {...props} />
      </div>

      <ErrorMessage component="p" name={field.name} className={styles.error} />
    </div>
  );
};

export default TextInput;
