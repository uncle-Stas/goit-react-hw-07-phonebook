import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import ContactsFilter from 'components/ContactsFilter/ContactsFilter';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectError } from 'Redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'Redux/contactsOperations';

function App() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section>
        <ContactForm />
      </Section>
      <Section>
        <>
          <ContactsFilter />
          {isLoading && (
            <SkeletonTheme highlightColor="#000000">
              <Skeleton />
            </SkeletonTheme>
          )}
          {error && <Notification text={error} />}
          {!error && <ContactsList />}
        </>
      </Section>
    </>
  );
}

export default App;
