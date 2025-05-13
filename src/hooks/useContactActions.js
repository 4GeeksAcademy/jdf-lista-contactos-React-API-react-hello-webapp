import useGlobalReducer from "./useGlobalReducer";

const API_URL = "https://playground.4geeks.com/apis/fake/contact/";

export const useContactActions = () => {
    const { store, dispatch } = useGlobalReducer();

    const getContacts = async () => {
        const res = await fetch(`${API_URL}agenda/my_agenda`);
        const data = await res.json();
        dispatch({ type: "set_contacts", payload: data });
    };

    const createContact = async (contact) => {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...contact, agenda_slug: "my_agenda" })
        });
        if (res.ok) getContacts();
    };

    const updateContact = async (id, contact) => {
        const res = await fetch(`${API_URL}${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        });
        if (res.ok) getContacts();
    };

    const deleteContact = async (id) => {
        const res = await fetch(`${API_URL}${id}`, {
            method: "DELETE"
        });
        if (res.ok) getContacts();
    };

    return {
        contacts: store.contacts,
        getContacts,
        createContact,
        updateContact,
        deleteContact
    };
};
