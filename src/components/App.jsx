import React, { useState, useEffect } from 'react';
import Sortable from 'sortablejs';
import Task from './Task';
import tasksData from './data/tasks.json';

const App = () => {
    const [entries, setEntries] = useState(tasksData);
    const [newTask, setNewTask] = useState("");
    const [sortable, setSortable] = useState();

    useEffect(() => {
        setSortable(
            Sortable.create(document.getElementById('tasklist'), {
                animation: 150,
                handle: ".my-handle",
            })
        );
    }, []);

    const handleNewTask = (ev) => {
        setNewTask(ev.target.value);
    }

    const getNewId = (entries) => {
        const ids = entries.map(entry => entry.id);
        const newId = (entries.length === 0) ? 1 : Math.max(...ids) + 1;
        return newId.toString();
    }

    const handleNewEntry = () => {
        setEntries((prevEntries) => [
            ...prevEntries, {
                id: getNewId(prevEntries),
                order: getNewId(prevEntries),
                content: newTask,
                isDone: false
            }
        ]);
        setNewTask("");
    }

    const deleteTask = ev => {
        updateOrder();
        const taskId = ev.target.parentElement.id;
        setEntries(entries.filter(entry => {
            return ("task-" + entry.id) !== taskId
        }));

    }

    const updateOrder = () => {
        setEntries(prevEntries =>
            prevEntries.map(
                entry => {
                    let order = sortable.toArray().indexOf(entry.id).toString();
                    return {
                        id: entry.id,
                        order: order,
                        content: entry.content,
                        isDone: entry.isDone
                    }
                }
            )
        );
    }

    const handleReorder = () => {
        updateOrder();
    }

    return <>
        <header>
            <h1>To Do List</h1>
        </header>

        <div id="new-task">
            Insert your new task:
            <input
                type="text"
                id="new-task-textbox"
                name="new-task-textbox"
                placeholder="New task"
                value={newTask}
                onChange={handleNewTask}
            />
            <button
                type="button"
                onClick={handleNewEntry}
            >Add</button>
        </div>

        <ul id="tasklist"
            onDrag={handleReorder}
        >
            {entries.map(
                entry => 
                    <Task
                        key={entry.id}
                        id={entry.id}
                        content={entry.content}
                        isDone={entry.isDone}
                        deleteTask={deleteTask}
                    />
            )}
        </ul>
    </>
}

export default App;









