import { FC, memo, useState } from "react";
import Image from "next/image";

import style from "@styles/food.module.css";
import { ShowImageProps } from "../Food";

type Props = ShowImageProps & {
  handleCloseImage: () => void;
};

const FoodImageContainer: FC<Props> = (props) => {
  const { imageSrc, title, handleCloseImage } = props;
  const [onAnimate, setOnAnimate] = useState(true);

  if (!imageSrc.length && !title.length) return null;

  const handleOnClose = () => {
    setOnAnimate(!onAnimate);
    setTimeout(() => {
      handleCloseImage();
    }, 205);
  };

  return (
    <div
      className={`${style.foodImageContainer} ${
        onAnimate ? style.onOpen : style.onClose
      } `}
    >
      <div>
        <button
          onClick={handleOnClose}
          className={style.foodContainerImageClose}
        >
          Close
        </button>
      </div>
      <Image
        src={imageSrc}
        alt={title}
        layout="fill"
        objectFit="scale-down"
        objectPosition="center"
      />
    </div>
  );
};

export default memo(FoodImageContainer);
