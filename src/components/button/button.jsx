import Style from './button.module.css'

const Button = ({children, onClick, width=240}) => {
    return (
        <button className={Style.form_button} onClick={onClick} style={{width: width + 'px'}}>{children}</button>
    )
}

export default Button