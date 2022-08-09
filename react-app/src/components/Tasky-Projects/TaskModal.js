import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../store/tasks";

const TaskModal = ({ showModal, tasks }) => {
  const dispatch = useDispatch();

  // const [showForm, setShowForm] = useState(false);
  // const [title, setTitle] = useState(task.title);
  // const [description, setDescription] = useState(task.description);
  // const [dueDate, setDueDate] = useState(task.dueDate);
  // const [valErrors, setValErrors] = useState([]);
  // const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   const errors = [];
  //   const current = Date.now()
  //   if (!title.length || title.length > 50) {
  //     errors.push('Title can\'t be empty or over 50 characters.')
  //   }
  //   if (current >= new Date(`${dueDate} 23:59:59`).getTime()) {
  //     errors.push('Due date can\'t be in the past.')
  //   }
  //   if (errors.length) {
  //     setValErrors(errors);
  //     return;
  //   } else {
  //     const payload = {
  //       task_id: task.id,
  //       title,
  //       description,
  //     };
  //     const res = await dispatch(updateTask(payload));
  //     if (res) {
  //       showModal(false);
  //       setSubmitted(false);
  //       setShowForm(false);
  //       setValErrors([]);
  //     };
  //   };
  // };

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   await dispatch(deleteTask(task.id))
  // }

  // return (
  //   <div className="task-modal">
  //     <button className="hide-modal" onClick={() => showModal(false)}>X</button>
  //     <button className="delete-task" onClick={handleDelete}>Delete Task</button>
  //     {!showForm && (
  //       <div className="task-info" onClick={() => setShowForm(true)}>
  //         <h3>{task.title}</h3>
  //         <p>{task.description}</p>
  //       </div>
  //     )}
  //     {showForm && (
  //       <div className="edit-task-form">
  //         {valErrors.length > 0 && submitted && (
  //           <div className="form-errors">
  //             {valErrors.map((error, idx) => (
  //               <p className="error" key={idx}>{error}</p>
  //             ))}
  //           </div>
  //         )}
  //         <form onSubmit={handleSubmit}>
  //           <div className="edit-task-info">
  //             <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
  //             <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
  //           </div>
  //           <button onClick={() => setShowForm(false)}>Cancel</button>
  //           <button type="submit">Save</button>
  //         </form>
  //       </div>
  //     )}
  //   </div>
  // )
  return (
    <h2>Hello</h2>
  )
}

export default TaskModal;
