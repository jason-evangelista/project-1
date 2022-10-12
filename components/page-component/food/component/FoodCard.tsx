import Image from "next/image";
import { FC } from "react";
import { FoodInfo } from "../../../../api/food";

import style from "../../../../styles/food.module.css";
import utilStyle from "../../../../styles/utils.module.css";
import { ShowImageProps } from "../Food";

type Props = FoodInfo & {
  handleShowImage: (params: ShowImageProps) => void;
};

const FoodCard: FC<Props> = (props) => {
  const { description, image, rate, title, handleShowImage } = props;

  const handleOnShowImage = () => handleShowImage({ imageSrc: image, title });
  return (
    <div className={style.foodCard} onClick={handleOnShowImage}>
      <div className={utilStyle.relative}>
        <Image
          src={image}
          alt={title}
          layout="responsive"
          width={100}
          height={50}
          objectFit="cover"
          loading="lazy"
        />
      </div>
      <div className={style.foodCardBody}>
        <p>{description}</p>
        <small className={style.foodCardRate}>Rate {rate} of 5</small>
      </div>
    </div>
  );
};

export default FoodCard;
