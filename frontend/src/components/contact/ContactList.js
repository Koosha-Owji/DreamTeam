/**
 * ContactList.component.js, lists all contacts in the format specified by ./Contact.js
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
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
