import css from './ContactItem.module.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'Redux/contactsOperations';
import { setDeleteId } from 'Redux/deleteSlice';
import { selectDeleteId, selectIsDeleting } from 'Redux/selectors';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const deleteId = useSelector(selectDeleteId);
  const isDeleting = useSelector(selectIsDeleting);

  const handleDispath = () => {
    dispatch(deleteContact(id));
    dispatch(setDeleteId(id));
    Notify.info(`${name} - was removed`);
  };

  return (
    <li className={css.contactItem}>
      <span className={css.itemText}>
        {name}: {number}
      </span>
      <button
        type="button"
        onClick={handleDispath}
        className={css.button}
        disabled={isDeleting}
      >
        {deleteId === id ? (
          <ThreeDots
            height="15"
            width="36.5"
            radius="6"
            color="#ffffff"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        ) : (
          'delete'
        )}
      </button>
    </li>
  );
};

export default ContactItem;

// --------------------------- PropTypes ----------------------

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
