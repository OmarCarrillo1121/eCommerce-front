import style from "./bannerCreate.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import template from "../../../../../../../Assets/img/background/bgVideogameForm.jpg";
import { useNavigate } from "react-router-dom";
import { validations } from "./validations";
import { postBanner } from "../../../../../../../redux/actions";

function BannerCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Define loading state
  const [errors, setErrors] = useState({}); // Define errors state

  const [newBanner, setNewBanner] = useState({
    title: "",
    logotypeUrl: "",
    backgroundUrl: "",
  });

  const [logotypeUrl, setLogotypeUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors(
      validations({
        ...newBanner,
        [name]: value,
        banned: false,
      })
    );
    setNewBanner({
      ...newBanner,
      [name]: value,
      banned: false,
    });
  };

  const UploadLogotype = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "vifx4gqq");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dvivroqoe/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setLogotypeUrl(file.secure_url);
    setErrors(
      validations({
        ...newBanner,
        logotypeUrl: file.secure_url,
        banned: false,
      })
    );
    setLoading(true);
    setNewBanner({
      ...newBanner,
      logotypeUrl: file.secure_url,
      banned: false,
    });
  };

  const UploadBackground = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "vifx4gqq");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dvivroqoe/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setBackgroundUrl(file.secure_url);
    setErrors(
      validations({
        ...newBanner,
        backgroundUrl: file.secure_url,
        banned: false,
      })
    );
    setLoading(true);
    setNewBanner({
      ...newBanner,
      backgroundUrl: file.secure_url,
      banned: false,
    });
  };

  const backDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postBanner(newBanner));
    // Note: Assuming you want to reset the form fields after submission.
    setNewBanner({
      title: "",
      logotypeUrl: "",
      backgroundUrl: "",
    });
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <nav>
          <h1>Crear un nuevo banner</h1>
        </nav>
        <div className={style.containerLabelInput}>
          <div className={style.first}>
            <div className={style.nameContainer}>
              <label htmlFor="name">Titulo: </label>
              <input
                type="text"
                name="title" // Use "name" instead of "title"
                value={newBanner.title}
                placeholder="Ingrese el titulo para el banner..."
                onChange={handleChange}
              />
              <br />
              <p>{errors.name ? errors.name : null}</p>
            </div>
          </div>
        </div>
        <div className={style.divImage}>
          <div className={style.imgContainer}>
            {loading ? (
              <img src={logotypeUrl} className={style.img} />
            ) : (
              <img src={template} className={style.img} />
            )}
            <label htmlFor="imageInput">Logotype Image</label>
            <input
              type="file"
              id="logotypeInput"
              name="logotype"
              onChange={UploadLogotype}
            />
            <br />
            <p>{errors.logotypeUrl ? errors.logotypeUrl : null}</p>
          </div>
        </div>
        <div className={style.divImage}>
          <div className={style.imgContainer}>
            {loading ? (
              <img src={backgroundUrl} className={style.img} />
            ) : (
              <img src={template} className={style.img} />
            )}
            <label htmlFor="imageInput">Background Image</label>
            <input
              type="file"
              id="backgroundInput"
              name="background"
              onChange={UploadBackground}
            />
            <br />
            <p>{errors.backgroundUrl ? errors.backgroundUrl : null}</p>
          </div>
        </div>
        <button
          className={style.btnSubmit}
          type="submit"
          disabled={
            Object.keys(errors).length > 0 ||
            !newBanner.title ||
            !newBanner.logotypeUrl ||
            !newBanner.backgroundUrl
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BannerCreate;
