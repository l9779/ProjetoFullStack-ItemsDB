import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Loading from './../components/Loading';
import { colors } from './../../config/cssValues';
import { EditModal, DeleteModal, AddModal } from './../components/Modals';
import { getItemList } from './../../reducers/dbSlice';
import {
  EditIcon,
  DeleteAllIcon,
  DeleteItemIcon,
  AddIcon,
} from './../../assets/icons';
import {
  openDeleteModal,
  openEditModal,
  openAddModal,
} from './../../reducers/modalSlice';

const ItemsListPage = () => {
  const { itemsList, isLoading } = useSelector((store) => store.db);
  const { isDeleteOpen, isEditOpen, isAddOpen, item } = useSelector(
    (store) => store.modal
  );

  const [searchFilter, setSearchFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  const RenderItems = () => {
    if (itemsList.length <= 0)
      return <h2>There&apos;s no items on the list. Start adding.</h2>;

    const displayedItems = searchFilter
      ? itemsList.filter(
          (listItem) =>
            listItem.nome.toLowerCase().includes(searchFilter.toLowerCase()) ||
            listItem.poder.toLowerCase().includes(searchFilter.toLowerCase())
        )
      : [...itemsList];

    return (
      <>
        {displayedItems.map((listItem) => {
          const { nome, poder, _id } = listItem;

          return (
            <div className='item' key={_id}>
              <div className='item-attributes'>
                <h2>{nome}</h2>
                <h3>{poder}</h3>
              </div>

              <div className='item-actions'>
                <button
                  className='edit-btn'
                  onClick={() => dispatch(openEditModal(listItem))}
                >
                  <EditIcon />
                </button>
                <button
                  className='del-btn'
                  onClick={() => dispatch(openDeleteModal(listItem))}
                >
                  <DeleteItemIcon />
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <ItemList>
      <div className='title-section'>
        <h1>Lista de itens</h1>

        <button className='add-btn' onClick={() => dispatch(openAddModal())}>
          <AddIcon />
        </button>
        <button
          className='del-btn'
          onClick={() => console.log('delete all click')}
        >
          <DeleteAllIcon />
        </button>
      </div>

      <input
        type='text'
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder='Digite o nome ou descrição'
      />

      <section className='item-list'>
        {isDeleteOpen && <DeleteModal item={item} />}
        {isEditOpen && <EditModal item={item} />}
        {isAddOpen && <AddModal />}

        {isLoading ? <Loading /> : <RenderItems />}
      </section>
    </ItemList>
  );
};

const ItemList = styled.main`
  max-width: 80rem;
  margin: 0 auto;

  .title-section {
    display: grid;
    grid-template-columns: 1fr 0.15fr 0.15fr;
    padding: 2px 0;
  }

  .title-section h1 {
    font-size: 2rem;
  }

  input {
    margin: 5px 0;
    font-size: 14px;
    width: 100%;
    height: 2.8rem;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: ${colors['dark-transparent']};
    padding: 0.8rem;

    overflow-y: scroll;
    min-height: 7rem;
    max-height: 70vh;
  }

  .item {
    background-color: ${colors['content-bg-color']};
    border-radius: 1.2rem;
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      color: ${colors.yellow};
      text-decoration: underline;
    }
  }

  .item-actions {
    display: flex;
    gap: 1rem;
  }

  .add-btn,
  .edit-btn,
  .del-btn {
    width: 24px;
    cursor: pointer;

    background: none;
    border: none;

    transition: color 300ms ease-in-out;

    color: ${colors.white};
  }

  .add-btn:hover {
    color: ${colors['light-green']};
  }

  .edit-btn:hover {
    color: ${colors.blue};
  }

  .del-btn:hover {
    color: ${colors.red};
  }
`;

export default ItemsListPage;
