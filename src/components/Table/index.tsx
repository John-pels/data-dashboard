import { SetStateAction, useState } from 'react';
import Pagination from 'react-responsive-pagination';
import { Link } from 'react-router-dom';
import { ITodos } from '../../@types';
import requestService from '../../services/requests';

const Table = ({ data }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10
    function handlePageChange(page: SetStateAction<number>) {
        setCurrentPage(page);
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = data.length / 10;
    const handleDeleteTask = async (id: number) => {
        try {
            const response = await requestService.deleteTask(id)
            console.log(response)
            if (response.status === 200) {
                alert('Task Deleted Successfully')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="table__container">
            <table className="dashboard__table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Id</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPost.map(({ id, userId, title, completed }: ITodos) => {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{userId}</td>
                                <td>{title}</td>
                                <td className={completed ? 'success' : 'error'}>{completed ? "complete" : "not complete"}</td>
                                <td>
                                    <Link to={`/edit_task/${userId}`}>
                                        <button className='dashboard__btn'>Edit</button>
                                    </Link>
                                    <button className='dashboard__btn delete' onClick={() => handleDeleteTask(userId)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={page => handlePageChange(page)}
            />
        </div>

    )
}

export { Table }
