import React, { useEffect } from "react";
import style from "../users/users.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeletedBanners,
  getEnabledBanners,
} from "../../../../../../../redux/actions";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Banners({ banners }) {
  const dispatch = useDispatch();
  const { deletedBanners, enabledBanners } = useSelector((state) => state);

  const data = {
    labels: ["Actualmente"],
    datasets: [
      {
        label: "Todos los Banners",
        data: [banners.length],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Banners habilitados",
        data: [enabledBanners.length],
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Banners desabilitados",
        data: [deletedBanners.length],
        backgroundColor: "purple",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  useEffect(() => {
    dispatch(getEnabledBanners());
    dispatch(getDeletedBanners());
  }, []);

  return (
    <div className={style.containerBar}>
      <Bar
        style={({ width: "1000px" }, { height: "600px" })}
        data={data}
        options={options}
      />
    </div>
  );
}

export default Banners;
