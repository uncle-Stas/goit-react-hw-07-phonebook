import css from './ContactForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'Redux/contactsSlice';

import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import { useState } from 'react';

const initialState = {
  name: '',
  number: '',
};

function ContactForm() {
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const handleChange = event => {
    const { name, value } = event.target;

    setState(prev => ({ ...prev, [name]: value }));
  };

  const checkRepeatName = name => {
    let nameRepeat = 0;

    for (const contact of contacts) {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        nameRepeat = 1;
        break;
      }
    }

    return nameRepeat;
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { name, number } = state;
    const id = nanoid();

    !checkRepeatName(name)
      ? dispatch(addContact({ id, name, number }))
      : Notify.failure(`${name}, is alredy in contacts`, {
          position: 'center-top',
          timeout: 5000,
        });

    setState(initialState);

    event.target.reset();
  };

  return (
    <>
      <h1 className={css.title}>Phonebook</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.inputLabel}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            placeholder="Enter name"
            autoComplete="off"
            minLength={3}
          />
        </label>
        <label className={css.inputLabel}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            placeholder="Enter phone number"
            autoComplete="off"
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </>
  );
}

export default ContactForm;
