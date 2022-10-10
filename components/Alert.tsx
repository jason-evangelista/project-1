import { FC, PropsWithChildren } from "react";
import styles from "../styles/alert.module.css";
import classNames from "classnames";

type AlertType = "success" | "error";

type Props = PropsWithChildren & {
  type: AlertType;
};

const Alert: FC<Props> = (props) => {
  const { children, type } = props;

  const alertStyle = classNames({
    [styles.success]: type === "success",
    [styles.error]: type === "error",
  });

  return <div className={alertStyle}>{children}</div>;
};

export default Alert;
