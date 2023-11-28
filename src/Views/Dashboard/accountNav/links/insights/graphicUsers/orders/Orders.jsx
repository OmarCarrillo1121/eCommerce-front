import React, { useEffect } from "react";
import style from "../users/users.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveOrders,
  getBannedUsers,
  getOrderCancelled,
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

function Orders({ orders }) {
  const dispatch = useDispatch();
  const { canceledOrder, activeOrder } = useSelector((state) => state);

  const data = {
    labels: ["Actualmente"],
    datasets: [
      {
        label: "Todas las ordenes",
        data: [orders.length],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Ordenes activas",
        data: [activeOrder.length],
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Ordenes desabilitadas",
        data: [canceledOrder.length],
        backgroundColor: "purple",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  useEffect(() => {
    dispatch(getOrderCancelled());
    dispatch(getActiveOrders());
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

export default Orders;
