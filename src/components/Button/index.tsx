import { FC } from 'react'
import { IButton } from '../../@types'
import './style.css'



const Button: FC<IButton> = ({ text, onClick }) => {
    return (
        <button type='submit' className="button" onClick={onClick}>{text}</button>
    )
}

export { Button }
