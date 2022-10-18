import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import style from "@styles/utils.module.css";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  formLabel: string;
  errorMessage?: string;
};

const FormGroup = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { formLabel, errorMessage, ...rest } = props;
  return (
    <div className={style.formGroupContainer}>
      <label htmlFor={props.id}>{formLabel}</label>
      <input {...rest} ref={ref} />
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
    </div>
  );
});

FormGroup.displayName = "Input";
export default FormGroup;
