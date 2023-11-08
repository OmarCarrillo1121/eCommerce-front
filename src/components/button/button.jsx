import Style from './button.module.css'

const Button = ({children, onClick}) => {
    return (
        <button className={Style.form_button} onClick={onClick}>{children}</button>
    )
}

export default Button