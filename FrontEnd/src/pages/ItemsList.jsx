import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { colors, measures } from '../../config/cssValues';
import { getItemList } from '../../reducers/dbSlice';
import {
  EditModal,
  DeleteModal,
  AddModal,
  DeleteAllModal,
  LoginNotifyModal,
} from '../components/Modals';
import {
  EditIcon,
  DeleteAllIcon,
  DeleteItemIcon,
  AddIcon,
} from '../../assets/icons';
import {
  openDeleteModal,
  openEditModal,
  openAddModal,
  openDeleteAllModal,
  openLoginInNotifyModal,
} from '../../reducers/modalSlice';

const ItemsListPage = () => {
  const {
    isDeleteOpen,
    isEditOpen,
    isAddOpen,
    isDeleteAllOpen,
    isLoginInNotifyOpen,
    item,
  } = useSelector((store) => store.modal);
  const { isLoggedIn, user } = useSelector((store) => store.user);
  const { itemsList, isLoading, errorMessage } = useSelector(
    (store) => store.db
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
            <ItemDiv key={_id}>
              <div className='item-attributes'>
                <h2>{nome}</h2>
                <h3>{poder}</h3>
              </div>

              <div className='item-actions'>
                <button
                  className='edit-btn'
                  onClick={() => {
                    if (isLoggedIn) dispatch(openEditModal(listItem));
                    else dispatch(openLoginInNotifyModal());
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  className='del-btn'
                  onClick={() => {
                    if (isLoggedIn) dispatch(openDeleteModal(listItem));
                    else dispatch(openLoginInNotifyModal());
                  }}
                >
                  <DeleteItemIcon />
                </button>
              </div>
            </ItemDiv>
          );
        })}
      </>
    );
  };

  const ErrorMessage = () => {
    return (
      <ErrorSection>
        {/* <pre>401</pre>
        <span>&nbsp;-&nbsp;</span> */}
        <h2>{errorMessage}</h2>
      </ErrorSection>
    );
  };

  return (
    <ItemList>
      {errorMessage && <ErrorMessage />}
      <div className='title-section'>
        <h1>Lista de itens</h1>

        <button
          className='add-btn'
          onClick={() => {
            if (isLoggedIn) dispatch(openAddModal());
            else dispatch(openLoginInNotifyModal());
          }}
        >
          <AddIcon />
        </button>
        <button
          className='del-btn'
          onClick={() => {
            if (isLoggedIn) dispatch(openDeleteAllModal());
            else dispatch(openLoginInNotifyModal());
          }}
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
        {isDeleteOpen && <DeleteModal item={item} token={user.token} />}
        {isEditOpen && <EditModal item={item} token={user.token} />}
        {isAddOpen && <AddModal token={user.token} />}
        {isDeleteAllOpen && <DeleteAllModal token={user.token} />}
        {isLoginInNotifyOpen && <LoginNotifyModal />}

        {isLoading ? <Loading /> : <RenderItems />}
      </section>
    </ItemList>
  );
};

const ErrorSection = styled.section`
  background-color: ${colors['error-bg']};
  border: 1px solid ${colors.red};
  color: ${colors['error-text']};
  border-radius: ${measures['br-1']};

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 15px 0;
  margin: 0 5px 10px 5px;

  pre,
  h2 {
    font-size: 1.6rem;
  }
`;

const ItemDiv = styled.div`
  background-color: ${colors['content-bg-color']};
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  border: 1px solid ${colors.white};

  display: flex;
  justify-content: space-between;
  align-items: center;

  .item-actions {
    display: flex;
    gap: 1rem;
  }
`;

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
