import { Dashboard } from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { AddNewTask } from './pages/NewTask';
import { EditTask } from './pages/EditTask';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new_task" element={<AddNewTask />} />
        <Route path="/edit_task/:userId" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
