import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBanners,
  getDeletedBanners,
  getEnabledBanners,
  deleteBanner,
  restoreBanner,
  setCurrentPage,
} from "../../../../../../redux/actions";
import style from "./bannerTable.module.css";
import NotBanners from "./notBanners/NotBanners";
import Select from "./selects/Select";
import Info from "./info/Info";
import Pagination from "../pagination/Pagination";
import { NavLink } from 'react-router-dom'

const BannersTable = () => {
  const { banners, currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);
  const [banner, setBanner] = useState({});
  const statusSelect = document.querySelector("#statusSelect");

  /* SET CURRENT PAGE */
  const bannersPerPage = 10;
  const totalBanners = banners.length;

  const firstIndex = bannersPerPage * (currentPage - 1);
  const lastIndex = firstIndex + bannersPerPage;

  let currentPageData = banners.slice(firstIndex, lastIndex);

  const onPageChange = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
  };

  const openInfo = (banner) => {
    setBanner(banner);
    setInfo(true);
  };

  const closeInfo = (e) => {
    e.preventDefault();

    setInfo(false);
    setBanner("");
  };

  const filterStatus = () => {
    if (statusSelect.value !== "All banners") {
      statusSelect.value = "All banners";
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === "All banners") {
      dispatch(getAllBanners());
    } else if (value === "Enabled banners") {
      dispatch(getEnabledBanners());
    } else if (value === "Deleted banners") {
      dispatch(getDeletedBanners());
    }
  };

  const bannerDelete = (id) => {
    dispatch(deleteBanner(id));
    setInfo(false);
    setBanner("");
  };

  const bannerRestore = (id) => {
    dispatch(restoreBanner(id));
    setInfo(false);
    setBanner("");
  };

  const showAllBanners = (e) => {
    e.preventDefault();

    if (statusSelect.value !== "All banners") {
      statusSelect.value = "All banners";
    }

    dispatch(getAllBanners());
  };

  useEffect(() => {
    dispatch(getAllBanners());
  }, []);

  return (
    <div className={style.tabletBanners}>
      <NavLink className={style.addGame} to={'/createBanner'}>Agrega un Banner</NavLink>
      <Select filter={filterStatus} handleChange={handleChange} />
      <table>
        <thead>
          <tr className={style.row}>
            <th></th>
            <th>ID de banner</th>
            <th>Titulo</th>
            <th>URL del logotipo</th>
            <th>URL del fondo</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length > 0 ? (
            currentPageData.map((banner, index) => {
              const rowClass =
                index % 2 === 0 ? style["rowEven"] : style["rowOdd"];

              return (
                <tr className={`${style.row} ${rowClass}`} key={banner.id}>
                  <td></td>
                  <td>{banner.id}</td>
                  <td>{banner.title}</td>
                  <td>{banner.logotypeUrl}</td>
                  <td>{banner.backgroundUrl}</td>
                  <td>{banner.banned ? "Disabled" : "Enabled"}</td>
                  <td>
                    <button onClick={() => openInfo(banner)}>⚙️</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <NotBanners />
          )}
        </tbody>
      </table>
      <Pagination
        totalUsers={totalBanners}
        currentPage={currentPage}
        pageSize={bannersPerPage}
        onPageChange={onPageChange}
      />
      <div className={style.containerMessage}>
        <p>
          <b>¿No encontraste lo que buscabas?</b> Es posible que algunos banners
          estén ocultas debido a los filtros que has seleccionado.
        </p>
        <button className={style.showBanners} onClick={showAllBanners}>
          Mostrar todos los banners
        </button>
        {banners.length !== 1 ? (
          <small>{banners.length} banners encontrados</small>
        ) : (
          <small>{banners.length} banner encontrado</small>
        )}
        {info && (
          <Info
            banner={banner}
            closeInfo={closeInfo}
            bannerDelete={bannerDelete}
            bannerRestore={bannerRestore}
          />
        )}
      </div>
    </div>
  );
};

export default BannersTable;
