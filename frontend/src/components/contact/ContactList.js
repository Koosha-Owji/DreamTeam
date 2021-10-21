import Contact from "./Contact";

const ContactList = ({contacts, labels}) => {
    return !Array.isArray(contacts) ? (
      ""
    ) : (
      <div>
        {contacts.map((contact) => (
          <Contact contacts={contacts} contact={contact} labels = {labels} />
        ))}
      </div>
    );
};
export default ContactList;
