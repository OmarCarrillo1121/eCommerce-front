import Style from './detailDescription.module.css'

const DetailDescription = ({ games }) => {
    return (
      <section className={Style.detail_description}>
        <article className={Style.detail_description_about}>
          <h2>Acerca del juego</h2>
          <p>{games?.description}</p>
        </article>
        <article className={Style.detail_description_info}>
          <h2>{games?.genre}</h2>
          <h2>{games?.platform}</h2>
          <h2>{games?.developer}</h2>
        </article>
      </section>
    )
  }

export default DetailDescription;