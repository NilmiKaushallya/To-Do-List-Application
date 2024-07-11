import React, { useState } from 'react';
import moment from 'moment/moment';
import { deleteTodoApi, MarkTodoApi, UpdateTodoApi } from '../../Services/api'; // Import the update API
import { toast } from 'react-toastify';

function Todo({ todo, setRefreshList }) {
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [newDesc, setNewDesc] = useState(todo.desc); // State to store new description
  const [dueDate, setDueDate] = useState(todo.dueDate); // State to store due date
  const [title, setTitle] = useState(todo.title); // State to store title

  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todo_id: todo._id,
    });
    console.log('delete todo', result);
    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast('Deleted');
    } else {
      toast('Failed to delete, please try again');
    }
  };

  const handleMarkTodo = async () => {
    const result = await MarkTodoApi({
      todo_id: todo._id,
    });
    console.log('Mark todo', result);
    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast(result.data.message);
    } else {
      toast('Failed to mark, please try again');
    }
  };

  const handleUpdateTodo = async () => {
    // Validate due date against current date
    const currentDate = moment().format('YYYY-MM-DD');
    if (moment(dueDate).isBefore(currentDate)) {
      toast('Due date cannot be earlier than today');
      return;
    }

    const result = await UpdateTodoApi({
      todo_id: todo._id,
      title: title,
      desc: newDesc,
      dueDate: dueDate,
    });
    console.log('Update todo', result);
    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast('Updated successfully');
      setEditMode(false); // Exit edit mode
    } else {
      toast('Failed to update, please try again');
    }
  };

  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light'>
      <div className='card-header'>
        <h3>{title}</h3>
        <p className='card-title'>{todo.isCompleted ? 'Completed' : 'Not Completed'}</p>
        <h5 className='card-text'>{moment(todo.dueDate).format('MMMM Do YYYY')}</h5>
      </div>
      <div className='card-body'>
        {editMode ? (
          <>
          <br />
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-control mb-2'
              placeholder='Title'
            />
            <input
              type='text'
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className='form-control mb-2'
              placeholder='Description'
            />
            <input
              type='date'
              value={dueDate ? moment(dueDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setDueDate(e.target.value)}
              className='form-control'
              placeholder='Due Date'
            />
          </>
        ) : (
          <>
          <br />
            <p
              className='card-title'
              style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
            >
              {todo.desc}
            </p>
            <br />
          </>
        )}
        <p className='card-text'>{moment(todo.date).fromNow()}</p>
      </div>
      <br></br>
      <div
        className='actionbuttons'
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div className='deletebutton'>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
            style={{ background: '', fontSize: '0.8rem', padding: '0.40rem 0.8rem' }}
          >
            Delete
          </button>
        </div>
        <div className='markTodo'>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={handleMarkTodo}
            style={{
              background: todo.isCompleted ? 'lightblue' : '',
              fontSize: '0.8rem',
              padding: '0.40rem 0.8rem'
            }}
          >
            {todo.isCompleted ? 'Mark uncomplete' : 'Mark complete'}
          </button>
        </div>
        <div className='updateTodo'>
          {editMode ? (
            <button
              type="button"
              className="btn btn-outline-success btn-sm"
              onClick={handleUpdateTodo}
              style={{ background: 'green', fontSize: '0.8rem', padding: '0.40rem 0.8rem' }}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-warning btn-sm"
              onClick={() => setEditMode(true)}
              style={{ background: 'orange', fontSize: '0.8rem', padding: '0.40rem 0.8rem' }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
