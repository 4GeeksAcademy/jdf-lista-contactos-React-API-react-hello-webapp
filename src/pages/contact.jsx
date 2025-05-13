import { useEffect } from 'react';
import { useContactActions } from '../hooks/useContactActions';
import ContactCard from '../components/ContactCard';

const Contact = () => {
    const { contacts, getContacts } = useContactActions();

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Lista de Contactos</h1>
            {contacts.length === 0 ? (
                <p>No hay contactos.</p>
            ) : (
                contacts.map(contact => (
                    <ContactCard key={contact.id} contact={contact} />
                ))
            )}
        </div>
    );
};

export default Contact;
