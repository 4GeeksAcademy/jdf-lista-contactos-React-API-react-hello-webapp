import React, { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const API_URL = "https://playground.4geeks.com/apis/fake/contact/";

  const getContacts = async () => {
    const res = await fetch(`${API_URL}agenda/my_agenda`);
    const data = await res.json();
    setContacts(data);
  };

  const createContact = async (contact) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...contact, agenda_slug: "my_agenda" })
    });
    getContacts(); // Refresh list
  };

  const updateContact = async (id, updatedContact) => {
    await fetch(`${API_URL}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact)
    });
    getContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`${API_URL}${id}`, { method: "DELETE" });
    getContacts();
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider value={{
      contacts,
      createContact,
      updateContact,
      deleteContact,
      getContacts
    }}>
      {children}
    </ContactContext.Provider>
  );
};
