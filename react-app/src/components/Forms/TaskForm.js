import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postTask } from "../../store/tasks";
import './css/tasks-form.css'

const TaskForm = ({ sectionId }) => {
  const dispatch = useDispatch();

  const projectId = +useParams().projectId;
  const userId = useSelector(state => state.session.user.id);

  const [keystroke] = useState(50);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(undefined);
  const [valErrors, setValErrors] = useState([])
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = [];
    const current = Date.now();
    if (!title.length || title.length > 50) {
      errors.push('Title can\'t be empty or over 50 characters.');
    }
    if (current >= new Date(`${dueDate} 23:59:59`).getTime()) {
      errors.push('Due Date can\'t be in the past.');
    }
    if (errors.length > 0) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        user_id: userId,
        project_id: projectId,
        section_id: sectionId,
        title,
        description,
        due_date: dueDate === undefined ? null : dueDate
      };
      const res = await dispatch(postTask(payload))
      if (res) {
        setTitle('');
        setDescription('');
        setDueDate(new Date());
        setShowForm(false)
        setValErrors([]);
        setSubmitted(false);
      };
    };
  };

  return (
    <div className="add-task-field">
      {!showForm && (
        <div className="pre-task-form">
          <p>Add Task</p>
          <button onClick={() => setShowForm(true)}>+</button>
        </div>
      )}
      {showForm && (
        <div className="post-task-form">
          {valErrors.length > 0 && submitted && (
            <div className="form-errors">
              {valErrors.map((error, idx) => (
                <p className="error" key={idx}>{error}</p>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="task-inputs">
              <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <p className={title.length > keystroke ? 'danger' : 'primary'}>{title.length}/{keystroke}</p>
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <button onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm
