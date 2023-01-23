import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { Dropdown } from "../../components/Dropdown"
import { InputField } from "../../components/InputField"
import requestService from "../../services/requests"

const INITIAL_STATE = {
    title: "",
    userId: "",
    completed: "false",
}
const options = [{ label: 'true', value: "true" }, { label: 'false', value: "false" }]

const AddNewTask = () => {
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [isLoading, setIsLoading] = useState(false)
    const { title, userId, completed } = formData
    const navigate = useNavigate()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        const payload = {
            title,
            userId: +userId,
            completed: completed === 'true'
        }
        try {
            const response = await requestService.addNewTask(payload)
            console.log(response)
            if (response.status === 201) {
                setFormData(INITIAL_STATE)
                alert("New task created successfully!")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <section className="auth-wrapper">
            <form className="form" onSubmit={handleSubmitForm}>
                <h1>Add New Task</h1>
                <InputField name="title" label="Title" value={title} onChange={handleInputChange} />
                <InputField name="userId" label="User ID" value={userId} onChange={handleInputChange} />
                <Dropdown name="completed" label="Status" value={completed} onChange={handleInputChange} options={options} />
                <Button text={isLoading ? "Please wait..." : "Submit"} />
            </form>
        </section>
    )
}
export { AddNewTask }
