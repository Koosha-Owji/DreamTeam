import Contact from "./Contact";

const ContactList = ({contacts, new_labels}) => {
    return !Array.isArray(contacts) ? (
      ""
    ) : (
      <div>
        {contacts.map((contact) => (
          <Contact contacts={contacts} contact={contact} new_labels = {new_labels} />
        ))}
      </div>
    );
};
export default ContactList;
