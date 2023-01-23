import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

const EditTask = () => {
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [isLoading, setIsLoading] = useState(false)
    const { title, userId, completed } = formData
    const navigate = useNavigate()
    const param = useParams<{ userId: any }>()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await requestService.getAllTodos(param.userId)
                console.log('edit data', response.data)
                const { title, userId, completed } = response.data
                setFormData({ title, userId: String(userId), completed: String(completed) });
            } catch (err) {
                console.log(err)
            } finally {

            }
        }
        getdata()
    }, [param.userId])

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        const payload = {
            title,
            userId: +userId,
            completed: completed === 'true'
        }
        try {
            const response = await requestService.editTask(payload, param.userId)
            console.log(response)
            if (response.status === 200) {
                setFormData(INITIAL_STATE)
                alert("Task edited successfully!")
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
                <h1>Edit Task</h1>
                <InputField name="title" label="Title" value={title} onChange={handleInputChange} />
                <InputField name="userId" label="User ID" value={userId} onChange={handleInputChange} />
                <Dropdown name="completed" label="Status" value={completed} onChange={handleInputChange} options={options} />
                <Button text={isLoading ? "Please wait..." : "Submit"} />
            </form>
        </section>
    )
}
export { EditTask }
