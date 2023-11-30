import React, { useEffect } from "react";
import style from "./users.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannedUsers,
  getUsersNotBanned,
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

function Users({ users }) {
  const dispatch = useDispatch();
  const { usersNotBannedOfi, bannedUsersOfi } = useSelector((state) => state);

  const data = {
    labels: ["Actualmente"],
    datasets: [
      {
        label: "Todos los usuarios",
        data: [users.length],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Usuarios activos",
        data: [usersNotBannedOfi.length],
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Usuarios baneados",
        data: [bannedUsersOfi.length],
        backgroundColor: "purple",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  useEffect(() => {
    dispatch(getBannedUsers());
    dispatch(getUsersNotBanned());
  }, []);

  return (
    <div className={style.containerBar}>
      <Bar
        style={({ width: "800px" }, { height: "500px" })}
        data={data}
        options={options}
      />
    </div>
  );
}

export default Users;
