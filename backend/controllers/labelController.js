/**
 * label.js, Contains backend functions relating to labels. 
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

 import label_model from '../models/label.js';
 import contact_model from '../models/contact.js';
 
 /**
  * Given a label specification, create a new label if it doesn't already exist and save it to the 
  * database
  * @param {request with label "title", "colour" and "user_id" in the body} req 
  * @param {response by which the new label json object will be sent} res 
  * @returns {the repsonse}
  */
 export const create_label = async (req, res) => {
 
     // Check for existing labels with the same title and colour. 
     const old_label = await label_model.findOne({
         title: req.body.title, 
         colour: req.body.colour,
         user_id: req.body.user_id
         })
         .catch((err) => {const old_label = 0});
 
     if (old_label) return res.json({message: "Label already exists"});
 
     // Create the new label
     const new_label = await label_model.create({
         title: req.body.title, 
         colour: req.body.colour, 
         user_id: req.body.user_id})
         .catch((err) => { return res.status(400).json(
             {message: "requests require a title, colour and user_id"}
         )});
 
 
     // Save the label to the database
     try {
         await new_label.save();
         return res.json({message: "Successfully added label!", label: new_label});
     } catch (err) { return res.status(500).json({message: "Error saving new label"}); }
 }
 
 /**
  * Given a label id, remove it from the database. 
  * @param {request with "_id" (a label id) in the body} req 
  * @param {response by which a success message or an error message will be sent} res 
  * @returns {the response}
  */
 export const delete_label = async (req, res) => {
     // add deletion of all references to the label in contacts
 
     try {
         const label_id = req.body._id;
         // delete the label
         label_model.deleteOne({ _id: label_id }).exec();
 
         // delete all references to the label in contacts
         await contact_model.updateMany({labelId: label_id}, {$pull: {labelId: label_id}});
 
         return res.send("Successfully deleted label if it exists");
 
     } catch (err) {
         res.status(400).json({message: "Error while deleting label"});
     }
 }
 
 /**
  * Retrieve all labels associated with a user 
  * @param {request with "user_id" in the body} req 
  * @param {response by which the (potentially empty) list of labels will be sent} res 
  * @returns {the response}
  */
 export const get_all_labels = async (req, res) => {
     try {
         console.log("Get all labels");
         const labels = await label_model.find();
         return res.json(labels);
     } catch (err) {
         return res.status(400).json({message: "label retrieval failed"});
     }
 }
 
 // Retrieve a single label based on any attributes
 // export const get_one_label = async (req, res) => {
 //     try {
 //         const label = await label_model.findOne(req.body).exec();
 //         res.json(label);
 //     } catch (err) {
 //         res.status(400).json({message: "failed to find a label with params:", params: req.body});
 //     }
 // }
 
 /**
  * Retrieve all labels associated with a contact by passing a list of label_ids
  * @param {requet with "contact_id" in the body} req 
  * @param {response by which the (potentiall empty) list of labels will be sent} res 
  */
// Retrieve all labels associated with a contact by passing a list of label_ids
export const get_labels_by_contact = async (req, res) => {
    var newlabels = [];

    try {
        console.log( "Get labels by contacts")
        // retrieve the contact form the db and extract the labels list
        const contact = await contact_model.findById(req.params.id);
        // extract the array of label ids from the contact
        const { labels } = contact;
        // retrieve each label from the db and insert into labels array
        const num_labels = labels.length;
        for (var i=0; i<num_labels; i++) {
            const label_id = labels[i];
            const label = await label_model.findById({_id: label_id}).exec()
            newlabels.push( label )
        }
        res.json(newlabels);

    } catch (err) {
        res.status(400).json({message: "Failed to retrieve labels"});
        console.log(err)
    }
}