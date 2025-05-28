
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList_page() 
{

  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);

  const urlAPI = 'https://6836b7b0664e72d28e41cd3e.mockapi.io/character/ToDoList';

  // useEffect = to show data as soon as user enter site
  useEffect(() => {
    getTasks();
  }, []);

  //GET DATA FROM API:
  const getTasks = () => {
    axios.get(urlAPI)
      .then(response => {
        setTasksList(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  // POST TO ADD TASK AND SEND IT TO API
  const postData = () => {

    axios.post(urlAPI, { task: task })
      .then(response => {
        setTasksList(prev => [...prev, response.data]);
        setTask('');
      })
      .catch(error => {
        console.error("Error posting data:", error);
      });
  };

  // DELETE TASK
  const deleteTask = (id) => {
    axios.delete(`${urlAPI}/${id}`)
      .then(() => {
        setTasksList(tasksList.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };




  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter your task..."
          className="p-2 border rounded w-64"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={postData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {tasksList.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>{item.task}</span>
            <button
              onClick={() => deleteTask(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList_page;
