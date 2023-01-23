import { ChangeEvent, useEffect, useState } from "react";
import requestService from "../services/requests";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { Link } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Dropdown } from "../components/Dropdown";
import { ITodos } from "../@types";

const options = [{ label: 'true', value: "true" }, { label: 'false', value: "false" }]

const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [isLoading, setIsLoading] = useState(true)
    const [filterBy, setFilterBy] = useState({
        title: "",
        completed: "false",
    })
    const { title, completed } = filterBy
    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFilterBy({
            ...filterBy,
            [name]: value
        })
    }

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await requestService.getAllTodos()
                setTasks(response.data);
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        getdata()
    }, [])

    useEffect(() => {
        const filteredData = tasks.filter
            ((task: ITodos) => task.title.includes(title)
                && task.completed ===
                (completed === "true"))
        if (filteredData.length) {
            return setFilteredTasks(filteredData || tasks)
        }
        return setFilteredTasks(tasks)
    }, [completed, tasks, title])


    return (
        <main className="dashboard">
            <header className="dashboard__header">
                <h2 className="dashboard__heading">Dashboard</h2>
                <Link to='/new_task'>
                    <Button text={'Add new task'} />
                </Link>
            </header>
            <form className="filter-form">
                <InputField
                    name="title"
                    label="Filter by title:"
                    value={title}
                    onChange={handleFilterChange}
                    placeholder="meme" />
                <Dropdown
                    name="completed"
                    label="Filter by Completed Status:"
                    value={completed}
                    onChange={handleFilterChange}
                    options={options}
                />
            </form>
            {isLoading ? <p>Loading...</p> : <Table data={filteredTasks} />}
        </main>
    )
}

export { Dashboard }
