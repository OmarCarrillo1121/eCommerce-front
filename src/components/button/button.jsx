import Style from './button.module.css'
import { useWindow } from '../../util/hook/window/useWindow'

const Button = ({children, onClick, width=240}) => {
    const { viewportWidth } = useWindow()
    return (
        <button className={Style.form_button} onClick={onClick} 
        style={{width: `${viewportWidth <= 800 ? 150 + 'px' : width + 'px'}`}}>{children}</button>
    )
}

export default Button