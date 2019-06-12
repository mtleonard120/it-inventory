import React from "react";
import styles from "./Card.module.css";
import { Title } from "../Title/Title";
import { concatStyles } from "../../../utilities/mikesConcat";

interface ICardProps {
  title?: any;
  children: any; //any so that dropdown can be used
  className?: string;
  titleClassName?: string;
}

export const Card: React.FC<ICardProps> = props => {
  const { title, children, className, titleClassName } = props;

  return (
    <div className={styles.cardMain}>
      {title && <Title title={title} className={titleClassName} />}
      <div className={concatStyles(styles.cardChildren, className)}>
        {children}
      </div>
    </div>
  );
};
