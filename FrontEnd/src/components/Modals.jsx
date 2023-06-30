/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import Button from './Button';
import { colors, measures } from './../../config/cssValues';
import {
  closeAddModal,
  closeEditModal,
  closeDeleteModal,
  closeDeleteAllModal,
  closeLoginInNotifyModal,
} from './../../reducers/modalSlice';
import {
  createItemList,
  editItemList,
  deleteItemList,
  clearItemList,
} from './../../reducers/dbSlice';

export const DeleteModal = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <ModalComp>
      <div className='modal'>
        <h2>Remove item from List?</h2>

        <div className='btn-container'>
          <Button
            className='btn-confirm'
            onClick={() => {
              dispatch(deleteItemList(item));
              dispatch(closeDeleteModal());
            }}
          >
            Confirm
          </Button>

          <Button
            className='btn-cancel'
            onClick={() => {
              dispatch(closeDeleteModal());
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </ModalComp>
  );
};

export const DeleteAllModal = () => {
  const dispatch = useDispatch();

  return (
    <ModalComp>
      <div className='modal'>
        <h2>Remove All Items?</h2>
      </div>

      <div className='btn-container'>
        <Button
          className='btn-confirm'
          onClick={() => {
            dispatch(clearItemList());
            dispatch(closeDeleteAllModal());
          }}
        >
          Confirm
        </Button>

        <Button
          className='btn-cancel'
          onClick={() => {
            dispatch(closeDeleteAllModal());
          }}
        >
          Cancel
        </Button>
      </div>
    </ModalComp>
  );
};

export const EditModal = ({ item }) => {
  const { _id, nome, poder } = item;
  const dispatch = useDispatch();

  function handleSubmit(e, id) {
    e.preventDefault();

    const updatedName = e.target['item-name'].value;
    const updatedDescription = e.target['item-description'].value;

    if (!updatedName || updatedName.length <= 2) {
      console.error('Nome inválido!');
      return;
    }
    if (!updatedDescription || updatedDescription.length <= 2) {
      console.error('descrição inválida!');
      return;
    }
    if (updatedName === nome && updatedDescription === poder) {
      dispatch(closeEditModal());
      return;
    }

    const updatedItem = {
      id,
      nome: updatedName,
      poder: updatedDescription,
    };

    dispatch(editItemList(updatedItem));
    dispatch(closeEditModal());
  }

  return (
    <ModalComp>
      <div className='modal'>
        <h2>Edit Item</h2>
        <p>{_id}</p>
        <form onSubmit={(e) => handleSubmit(e, _id)}>
          <label htmlFor='item-name'>Name:</label>
          <input
            type='text'
            defaultValue={nome}
            name='item-name'
            id='item-name'
          />
          <label htmlFor='item-description'>Description:</label>
          <input
            type='text'
            defaultValue={poder}
            name='item-description'
            id='item-description'
          />
          <div className='btn-container row'>
            <Button type='submit' className='btn-confirm'>
              Save
            </Button>
            <Button
              type='button'
              className='btn-cancel'
              onClick={() => {
                dispatch(closeEditModal());
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalComp>
  );
};

export const AddModal = () => {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    const nome = e.target['item-name'].value;
    const poder = e.target['item-description'].value;

    if (!nome || nome.length <= 2) {
      console.error('Nome inválido!');
      return;
    }
    if (!poder || poder.length <= 2) {
      console.error('descrição inválida!');
      return;
    }

    dispatch(createItemList({ nome, poder }));
    dispatch(closeAddModal());
  }

  return (
    <ModalComp>
      <div className='modal'>
        <h2>Register Item</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor='item-name'>Name:</label>
          <input
            type='text'
            name='item-name'
            id='item-name'
            defaultValue={'Novo item'}
          />
          <label htmlFor='item-description'>Description:</label>
          <input
            type='text'
            name='item-description'
            id='item-description'
            defaultValue={'Nova descrição'}
          />
          <div className='btn-container row'>
            <Button type='submit' className='btn-confirm'>
              Save
            </Button>
            <Button
              type='button'
              className='btn-cancel'
              onClick={() => dispatch(closeAddModal())}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ModalComp>
  );
};

export const LoginNotifyModal = () => {
  const dispatch = useDispatch();

  return (
    <ModalComp>
      <div className='modal'>
        <h2>Log in first</h2>
        <h3>to make changes on the list</h3>
        <Button onClick={() => dispatch(closeLoginInNotifyModal())}>ok</Button>
      </div>
    </ModalComp>
  );
};

const ModalComp = styled.aside`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: ${colors['main-bg-color']};
  width: 28rem;
  height: 20rem;
  border-radius: ${measures['br-1']};
  border: solid ${colors.white} 2px;
  text-align: center;

  .modal {
    padding: 1rem 2rem;
  }

  .modal h2 {
    text-decoration: underline;
  }

  .modal h3 {
    color: ${colors.grey};
    font-size: 1.5rem;
    margin: 20px 0;
  }

  .modal p {
    color: ${colors.grey};
  }

  .btn-container {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .row {
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .btn-confirm {
    border-color: ${colors.blue};
  }

  .btn-cancel {
    border-color: ${colors.red};
  }

  form label {
    font-size: 1.4rem;
    text-align: start;
    font-weight: 600;
  }

  form input {
    height: 2.2rem;
  }
`;
