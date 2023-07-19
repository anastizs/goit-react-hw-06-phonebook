import { ContactForm } from "../ContactForm/ContactForm";
import { ContactList } from "../ContactList/ContactList";
import { Filter } from "../Filter/Filter";
import { AppTitle, SectionTitle, Wrapper } from "./App.styled";

export const App = () => {
  return (
    <Wrapper>
      <AppTitle>Phonebook</AppTitle>
      <SectionTitle>Add new contact</SectionTitle>
      <ContactForm />
      <SectionTitle>Contacts</SectionTitle>
      <Filter />
      <ContactList />
    </Wrapper>
  );
};
