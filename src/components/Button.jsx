/* eslint-disable react/prop-types */
import styles from './Button.module.css'

function Button({children, onClick, type = "primary"}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
  )
}

export default Button