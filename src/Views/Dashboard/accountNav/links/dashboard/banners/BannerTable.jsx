import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllBanners,
  deleteBanner,
  restoreBanner,
  getDeletedBanners,
  getEnabledBanners
} from "../../../../../../redux/actions";
import style from "./bannerTable.module.css";

const BannerTable = () => {
    const [localBanners, setLocalBanners] = useState([]);
  const { banners } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalBanners(banners);
  }, [banners]);

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === "All banners") {
      dispatch(getAllBanners());
    } else if (value === "Deleted banners") {
      dispatch(getDeletedBanners());
    } else if (value === "Enabled banners") {
      dispatch(getEnabledBanners());
    }
  };

  const updateLocalBanners = (id, action) => {
    const updatedBanners = localBanners.filter((banner) => banner.id !== id);
    setLocalBanners(updatedBanners);
  };

  const bannerDelete = (id) => {
    const shouldDelete = window.confirm(
        "Are you sure you want to delete this banner?"
    );

    if (shouldDelete) {
        dispatch(deleteBanner(id));
        updateLocalBanners(id, "delete");
    }
  };

  const bannerRestore = (id) => {
    const shouldRestore = window.confirm(
        "Are you sure you want to restore this banner?"
    );

    if (shouldRestore) {
        dispatch(restoreBanner(id));
        updateLocalBanners(id, "restore");
    }
  };

  return (
    <div className={style.tabletBanners}>
      <div>
        <h2>Banners</h2>
        {localBanners.length !== 1 ? (
          <small>{localBanners.length} banners found</small>
        ) : (
          <small>{localBanners.length} banner found</small>
        )}
      </div>
      <select onChange={handleChange}>
        <option value="All banners">All banners</option>
        <option value="Enabled banners">Enabled banners</option>
        <option value="Deleted banners">Deleted banners</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Logotype URL</th>
            <th>Background URL</th>
            <th>Delete</th>
            <th>Restore</th>
          </tr>
        </thead>
        <tbody>
          {localBanners.length > 0
            ? localBanners.map((banner) => (
                <tr className={style.row} key={banner.id}>
                  <td>{banner.title}</td>
                  <td>{banner.logotypeUrl}</td>
                  <td>{banner.backgroundUrl}</td>
                  <td>
                    <button onClick={() => bannerDelete(banner.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => bannerRestore(banner.id)}>
                      Restore
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTable;
