import { useState, useEffect } from "react";
import Notiflix from "notiflix";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (newContact) => {
    const isExists = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExists) {
      return Notiflix.Notify.warning(
        `${newContact.name} is already in contacts`
      );
    }
    setContacts((prev) => [...prev, newContact]);
  };

  const deleteHandler = (contactId) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
  };

  const filterHandler = (e) => {
    const { value } = e.currentTarget;
    setFilter(value.toLowerCase());
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={filterHandler} />
        <ContactList contacts={visibleContacts} onDelete={deleteHandler} />
      </Section>
    </>
  );
}
