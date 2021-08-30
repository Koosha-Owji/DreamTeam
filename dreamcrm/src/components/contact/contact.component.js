// import { MdDelete } from 'react-icons/md';
// import { MdModeEdit } from 'react-icons/md';

const Contact = ({first_name, last_name, business, phone_number,
                    description, email_address}) => {

    return (
        <div className = 'contact'>
            <MdModeEdit 
                cursor = 'pointer' 
                className = 'edit_icon' 
                size = '1.3em'
            />
            <h2>{title}</h2>
            <textarea rows = '10'>{text}</textarea>
            
        </div>
    );
};