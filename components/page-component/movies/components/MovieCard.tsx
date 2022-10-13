import { FC } from "react";

import Image from "next/image";
import style from "@styles/food.module.css";
import utilStyle from "@styles/utils.module.css";
import Movie from "../type/Movie";

type Props = Movie;

const MovieCard: FC<Props> = (props) => {
  const { description, coverPhoto, rating, releaseDate, title } = props;

  return (
    <article className={style.foodCard}>
      <div className={utilStyle.relative}>
        <Image
          src={coverPhoto}
          alt={title}
          layout="responsive"
          width={100}
          height={50}
          objectFit="cover"
          loading="lazy"
        />
      </div>
      <div className={style.foodCardBody}>
        <h3>{title}</h3>
        <p>{description}</p>
        <small className={style.foodCardRate}>Rating {rating}</small>
        <br />
        <small>Relase Date: {new Date(releaseDate).toDateString()}</small>
      </div>
    </article>
  );
};

export default MovieCard;
