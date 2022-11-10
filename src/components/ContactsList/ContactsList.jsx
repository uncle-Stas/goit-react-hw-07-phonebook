import css from './ContactsList.module.css';

import Notification from 'components/Notification/Notification';
import ContactItem from './ContactItem';

import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'Redux/selectors';

const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filterContacts = () => {
    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContacts();
  const checkFilteredContacts = filteredContacts.length;

  return (
    <>
      {checkFilteredContacts ? (
        <ul className={css.contactsList}>
          {filteredContacts.map(contact => (
            <ContactItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.phone}
            />
          ))}
        </ul>
      ) : (
        <Notification
          text={`${filter} - is not in your phone book. Please add new contact.`}
        />
      )}
    </>
  );
};

export default ContactsList;
