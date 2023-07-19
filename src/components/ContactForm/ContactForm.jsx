import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Report } from "notiflix/build/notiflix-report-aio";
import { getContacts } from "redux/selectors";
import { addContact } from "redux/contactsSlice";
import { Form, Label, Input, Button } from "./ContactForm.styled";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formReset = () => {
    setName("");
    setNumber("");
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        throw new Error("unsupported type");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const {
      name: { value: name },
      number: { value: number },
    } = e.currentTarget.elements;

    const isExists = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      return Report.info(
        "Enter correct information",
        `${name} is already in contacts`,
        "Ok"
      );
    }
    dispatch(addContact({ name, number }));

    formReset();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </Label>

      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
};
