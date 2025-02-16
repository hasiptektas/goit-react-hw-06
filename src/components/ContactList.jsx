import { useSelector } from 'react-redux';
import Contact from './Contact';
import { selectContacts } from '../redux/contactsSlice';
import { selectNameFilter } from '../redux/filtersSlice';

export default function ContactList() {
  const persons = useSelector(selectContacts); // Kişi listesini al
  const filter = useSelector(selectNameFilter); // Filtre değerini al

  // Filtreleme işlemi
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person, index) => (
        <Contact key={index} person={person} />
      ))}
    </div>
  );
}