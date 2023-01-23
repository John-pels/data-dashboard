import React, { FC } from "react"
import { IDropdown } from "../../@types"

const Dropdown: FC<IDropdown> = ({ name, label, value, onChange, options }) => {
    return (
        <div className="form__input-group">
            <label htmlFor={name}>{label}</label>
            <select
                className="form__input"
                name={name}
                value={value}
                onChange={onChange}
                required
            >
                {
                    React.Children.toArray(options.map(({ label, value }) => (
                        <>
                            <option value={value}>{label}</option>
                        </>
                    )))
                }
            </select>
        </div>
    )
}

export { Dropdown }
