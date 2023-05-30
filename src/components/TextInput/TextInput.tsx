import { ErrorMessage, FieldProps } from "formik";
import styles from "./TextInput.module.scss";

interface TextInputProps extends FieldProps {
  label: string;
  id?: string;
}

const TextInput: React.FC<TextInputProps> = ({ field, form, ...props }) => {
  return (
    <div className={styles.thumb}>
      <div className={styles.thumb__input_thumb}>
        <label
          className={styles.thumb__input_label}
          htmlFor={props.id || field.name}
        >
          {props.label}
        </label>
        <input type="text" {...field} {...props} />
      </div>

      <ErrorMessage
        component="p"
        name={field.name}
        className={styles.validation_error}
      />
    </div>
  );
};

export default TextInput;
