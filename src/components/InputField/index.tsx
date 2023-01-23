
import { FC } from 'react'
import { IInput } from '../../@types'





const InputField: FC<IInput> = ({ name, value, label, onChange, placeholder, type = "text" }) => {
    return (
        <div className="form__input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className="form__input"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    )
}

export { InputField } 
