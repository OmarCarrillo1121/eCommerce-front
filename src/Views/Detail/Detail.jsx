import React from "react";
import { useParams } from "react-router-dom";
import { useGames } from '../../util/hook/games/useGames'
import DetailSection from "./detailSecion/detailSection";
import DetailDescription from "./detailDescription/detailDescription";
import Style from './detail.module.css'
import ReviewSection from "./reviewSection/ReviewSection";

export default function Detail () {
  const { id } = useParams();
  const { games } = useGames(id);
    return (
      <div>
      <div className={Style.detail}>
        <DetailSection games={games}/>
      </div>
        <DetailDescription games={games}/>
        <ReviewSection gameId={id} />
      </div>
    )
}