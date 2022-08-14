import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { getSections } from "../../store/sections";
import { deleteTask, getTasks, updateTask } from "../../store/tasks";
import './css/task-view.css'
import NotFound from "./NotFound";

const TaskView = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const projectId = +useParams().projectId;
  const taskId = +useParams().taskId;

  const userId = useSelector(state => state.session.user.id);

  const task = useSelector(state => Object.values(state.tasks)
    .filter(task => task.project_id === projectId))
    .find(task => task.id === taskId);

  const section = useSelector(state => Object.values(state.sections)
    .find(section => section.id === task?.section_id));

  const project = useSelector(state => Object.values(state.projects)
    .find(project => project.id === task?.project_id));

  const dateFormatter = (date) => {
    if (date) {
      if (date.length === 10) {
        return date;
      } else {
        date = new Date(date.slice(0, -4));
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
      };
    } else {
      return;
    };
  };

  const [showTextForm, setShowTextForm] = useState(false);
  const [keystroke] = useState(50);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(dateFormatter(""));
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getTasks(projectId));
    dispatch(getSections(projectId));
  }, [dispatch, projectId]);

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(dateFormatter(task.due_date));
    setShowTextForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = [];
    const current = Date.now()
    if (!title.length || title.length > 50) {
      errors.push('Title can\'t be empty or over 50 characters.')
    }
    if (current >= new Date(`${dueDate} 23:59:59`).getTime()) {
      errors.push('Due date can\'t be in the past.')
    }
    if (errors.length) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        task_id: task.id,
        title,
        description,
        due_date: dueDate
      };
      const res = await dispatch(updateTask(payload));
      if (res) {
        setSubmitted(false);
        setShowTextForm(false);
        setValErrors([]);
      };
    };
  };

  const determineDue = (date) => {
    date = new Date(date.slice(0, -4))
    const today = new Date(Date.now());

    if (today.getDate() > date.getDate()) {
      return `${today.getDate() - date.getDate()} day(s) overdue.`
    } else if (today.getDate() === date.getDate()) {
      return `Due today.`
    } else {
      date = date.toString().split(' ');
      return `Due ${date[0]}, ${date[1]} ${date[2]}`
    };
  };

  if (!task || !section || !project) {
    return (
      <NotFound />
    )
  } else if (task.user_id !== userId) {
    return (
      <NotFound />
    )
  } else {
    return (
      <div className="task-view">
        {!showTextForm && (
          <div className="task-title-description">
            <div className="task-heading-bar">
              <h2 className="task-header">{task.title}</h2>
              <div className="task-actions">
                <div id="pencil" className="fa fa-pencil-square-o" onClick={() => handleEdit(task)} />
                <div id="trash" className="fa fa-trash-o" onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(deleteTask(task.id));
                  history.push(`/projects/${projectId}`)
                }} />
              </div>
            </div>
          </div>
        )}
        {showTextForm && (
          <div className="task-td-edit">
            <form className="edit-task-form" onSubmit={handleSubmit}>
              <div className="task-title-edit">
                <input type="text" placeholder="Task Title" value={title || ''} onChange={(e) => setTitle(e.target.value)} />
                <div className={title.length === 0 || (title.length > keystroke) ? 'danger' : 'primary'} >{title.length}/{keystroke}</div>
              </div>
              <div className="edit-task-actions">
                <button className="cancel" onClick={() => setShowTextForm(false)}>Cancel</button>
                <button className="save" type="submit">Save</button>
              </div>
            </form>
            {valErrors.length > 0 && submitted && (
              <div className="form-errors">
                {valErrors.map((error, idx) => (
                  <div key={idx} className="error">{error}</div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="task-locale">
          <div className="project-locale">
            <h4>In Project: </h4>
            <div id={`color-label-${project.color_label.split(' ')[0].toLowerCase()}`} />
            <h4 className="task-project-locale">{project.name}</h4>
          </div>
          <h4 className="task-section-locale">Under Section: {section.name}</h4>
        </div>
        {!showTextForm && (
          <>
            {task.description && (
              <div className="description-box">
                <p className="task-description">{task.description}</p>
              </div>
            )}
            {!task.description && (
              <p className="task-description">No Description...</p>
            )}
          </>
        )}
        {showTextForm && (
          <textarea className="description-edit" name="description" placeholder="Write a description here..." value={description} onChange={(e) => setDescription(e.target.value)} />
        )}
        {!showTextForm && (
          <>
            {task.is_complete && (
              <div className="date">Complete</div>
            )}
            {!task.is_complete && (
              <div className="date">
                <h4 className={determineDue(task.due_date).includes('overdue') ? 'overdue' : 'due'}>{determineDue(task.due_date)}</h4>
              </div>
            )}
          </>
        )}
        {showTextForm && (
          <input className="date-edit" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        )}
        {!showTextForm && (
          <Link className="project-return" to={`/projects/${projectId}`}>Return to Project</Link>
        )}
      </div>
    )
  }
}


export default TaskView;
