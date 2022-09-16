import React, { useState } from 'react';

const Task = ({ id, content, isDone, deleteTask}) => {
    const [value, setValue] = useState(content);
    const [taskStatus, setTaskStatus] = useState(isDone);

    const strikeThrough = { textDecoration: "line-through" }

    const toggleTaskStatus = () => {
        setTaskStatus(!taskStatus);
    }

    const onContentChange = (ev) => {
        setValue(ev.target.value);
    }

    return <li
        className="task"
        id={"task-" + id}
        data-id={id}
        >
        <input
            type="checkbox"
            id={"checkbox-" + id}
            checked={ !!taskStatus }
            onChange={toggleTaskStatus}
        />
        <input
            type="text"
            id={"textbox-" + id}
            name={"textbox" + id}
            className="task-content"
            value={value}
            onChange={onContentChange}
            style={taskStatus ? strikeThrough : null}
        />
        <i className="fa-solid fa-trash"
            onClick={deleteTask}
        ></i>
        <i className="fa-solid fa-bars my-handle"></i>
    </li>
}

export default Task;