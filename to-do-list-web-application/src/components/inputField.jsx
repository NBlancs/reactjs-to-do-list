import { useState } from 'react';

function InputField() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    const handleEdit = (taskId, newText) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, text: newText } : task
        ));
    };

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="input-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="task-input">Input here: </label>
                <input
                    type="text"
                    id="task-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Task Here"
                    required
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="task">
                        <span
                            onClick={() => toggleComplete(task.id)}
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => {
                            const newText = prompt('Edit your task:', task.text);
                            if (newText) handleEdit(task.id, newText);
                        }}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InputField;