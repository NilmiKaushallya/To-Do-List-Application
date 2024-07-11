import React, { useState } from 'react';
import { createTodoApi } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';

function AddTodoModal({ setRefreshList }) {
  const [todoDesc, setTodoDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [title, setTitle] = useState('');

  const handleTodoSubmit = async () => {
    if (todoDesc === '') {
      toast('Todo description is required');
      return;
    }

    if (dueDate && new Date(dueDate) < new Date()) {
      toast('Due date cannot be earlier than today');
      return;
    }

    const result = await createTodoApi({ title: title, desc: todoDesc, dueDate: dueDate });
    console.log(result);

    if (result.status === 200 && result.data.status === 200) {
      toast('Todo Added');
      setRefreshList(new Date());
      setTodoDesc('');
      setDueDate('');
      setTitle('');
    } else {
      toast(result.data.message);
    }
  };

  return (
    <div className='modal mt-5' id='exampleModal'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='modal-title'>Add new Todo</div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div className="modal-body">
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
              />
            </div>
            <div className='form-group mt-2'>
              <textarea
                name=''
                className='form-control'
                rows={3}
                onChange={(e) => { setTodoDesc(e.target.value) }}
                placeholder='Write your Todo things here'
              ></textarea>
            </div>
            <div className='form-group mt-2'>
              <input
                type='date'
                className='form-control'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder='Set Due Date'
              />
            </div>
          </div>

          <div className='modal-footer'>
            <button className='btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss='modal'>Save Todo</button>
            <button className='btn btn-secondary' onClick={() => { setTodoDesc(''); setDueDate(''); setTitle(''); }} data-bs-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;
