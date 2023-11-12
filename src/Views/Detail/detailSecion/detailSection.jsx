import Style from './detailSection.module.css'
import Button from '../../../components/button/button'

const DetailSection = ({ games }) => {
    return (
      <section className={Style.detail_main}>
        <img src={games?.image} alt="imagen" className={Style.detail_img}/>
          <div className={Style.detail_info}>
            <h1>{games?.name}</h1>
            <div className={Style.detail_info_more}>
              <h2>{games?.platform}</h2>
              <h2>Stock: {games?.stock}</h2>
              <h3>{games?.developer}</h3>
            </div>
              <h2 className={Style.detail_main_price}>
                <span>-33%</span>${games?.price}
              </h2>
            <div className={Style.detail_buttons}>
              <Button children={<h1>🛒</h1>}width={50}/>
              <Button children={'Comprar ahora!'}/>
            </div>
          </div>
      </section>
    )
  }

export default DetailSection