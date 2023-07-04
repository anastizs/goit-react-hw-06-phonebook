import React, { Component } from "react";
import Notiflix from "notiflix";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      console.log("Обновилось поле todos, записываю todos в хранилище");
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }
  formSubmitHandler = (newContact) => {
    const isExists = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExists) {
      return Notiflix.Notify.warning(
        `${newContact.name} is already in contacts`
      );
    }
    this.setState(({ contacts }) => {
      return { contacts: [newContact, ...contacts] };
    });
  };
  deleteHandler = (contactId) => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter((contact) => contact.id !== contactId),
      };
    });
  };
  filterHandler = (e) => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  render() {
    const filter = this.state.filter.toLowerCase();
    const contacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHandler} />
        </Section>

        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.filterHandler} />
          <ContactList contacts={contacts} onDelete={this.deleteHandler} />
        </Section>
      </>
    );
  }
}
export default App;
