import React, { useEffect, useState } from 'react';
import Header from './Header';
import Todo from './partials/Todo';
import AddTodoModal from './partials/AddTodoModal';
import { useNavigate } from 'react-router-dom';
import { getTodoApi, getToken } from '../Services/api';
import { ToastContainer } from 'react-toastify';

function Home() {
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  useEffect(() => {
    if (!getToken()) {
      navigation('/login');
    }
    fetchTodoList();
  }, [refreshList]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredList(list);
    } else {
      const filterList = list.filter((todo) => {
        const titleMatches = todo.title.toLowerCase().includes(searchText.toLowerCase().trim());
        const dueDateMatches = todo.dueDate && todo.dueDate.includes(searchText.trim()); // Assuming dueDate is a string to be matched directly
        return titleMatches || dueDateMatches;
      });
      setFilteredList(filterList);
    }
  }, [list, searchText]);

  async function fetchTodoList() {
    try {
      const result = await getTodoApi();
      console.log('todolist', result);
      if (result.status === 200 && result.data.status === 200) {
        setList(result.data.data.todos.reverse());
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {filteredList.length === 0 && (
            <div className="notFoundTodos">
              No todos
            </div>
          )}
          {filteredList.map((todo) => (
            <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />
          ))}
        </div>
      </div>
      <div style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
        <button
          type="button"
          className="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          + Add
        </button>
      </div>

      <AddTodoModal setRefreshList={setRefreshList} />
    </div>
  );
}

export default Home;
