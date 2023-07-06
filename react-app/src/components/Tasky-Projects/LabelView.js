import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAllSections } from "../../store/all";
import { updateLabel } from "../../store/labels";
import { getLabelTasks, postTask } from "../../store/tasks";
import './css/label-view.css'
import { colorsv2 } from "./LabelsSplash";

const LabelView = ({ projects, labels }) => {
  const dispatch = useDispatch();
  const labelId = +useParams().labelId;
  const label = labels.find(label => label.id === labelId);

  const userId = useSelector(state => state.session.user.id);
  const sections = useSelector(state => Object.values(state.all));
  const tasks = useSelector(state => Object.values(state.tasks));
  console.log(tasks);

  const today = new Date(Date.now());

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
    }
  }

  const dateFormatter = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
  }

  useEffect(() => {
    dispatch(getAllSections(userId));
    dispatch(getLabelTasks(labelId));
  }, [dispatch, userId, labelId]);

  // Label Edit
  const [showEditForm, setShowEditForm] = useState(false);
  const [labelName, setLabelName] = useState(label.label);
  const [lkeystroke] = useState(20);
  const [colorLabel, setColorLabel] = useState(label.color_label);

  // Task Form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [keystroke] = useState(50);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(dateFormatter(today));
  // TODO: Fix this state
  const [values, setValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: userId,
      project_id: +values[0],
      section_id: +values[2],
      title,
      description,
      due_date: dueDate === undefined ? null : dueDate
    };
    console.log("PAYLOAD:: ", payload);
    const res = await dispatch(postTask(payload))

    const relation = {
      task_id: res.id,
      label_id: labelId
    };

    await fetch(`/api/projects/labels/relate`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(relation)
    });
    if (res) {
      setTitle('');
      setDescription('');
      setDueDate(dateFormatter(today));
      setValues([]);
      setShowTaskForm(false);
    };
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const payload = {
      id: labelId,
      label: labelName,
      color_label: colorLabel
    }
    const res = await dispatch(updateLabel(payload));
    if (res) {
      setShowEditForm(false);
      setLabelName(res.label);
      setColorLabel(res.color_label);
    };
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setLabelName(label.label);
    setColorLabel(label.color_label);
  }

  return (
    <>
      <div className="label-view-heading">
        {!showEditForm && (
          <div>
            <h3 id={label.label.toLowerCase() === 'iridescent' ? 'label-iridescent' : `label-${label.color_label.split(' ')[0].toLowerCase()}`} className="fa fa-tags" />
            <h3>{label.label}</h3>
          </div>
        )}
        {showEditForm && (
          <form onSubmit={handleEdit}>
            <div className="lv-edit-inputs">
              <input
                type="text"
                placeholder="Label Name"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
              />
              <p className={!labelName.length || labelName.length > lkeystroke ? 'danger' : 'primary'}>{labelName.length}/{lkeystroke}</p>
              <select name='color label' onChange={(e) => setColorLabel(e.target.value)}>
                {colorsv2.map((color, idx) => (
                  <option key={idx} style={{ color: color.code }} value={color.color}>{color.color}</option>
                ))}
              </select>
            </div>
            <div className="lv-edit-actions">
              <button className="cancel" onClick={handleEditCancel}>Cancel</button>
              <button className={`save-${!labelName.length || labelName.length > lkeystroke}`} disabled={!labelName.length || labelName.length > lkeystroke} type="submit">Save</button>
            </div>
          </form>
        )}
        {!showTaskForm && !showEditForm && (
          <div className="label-actions">
            <button id="pencil" className="fa fa-pencil-square" onClick={() => setShowEditForm(true)} />
            <button onClick={() => setShowTaskForm(true)}>+ Add Task</button>
          </div>
        )}
      </div>
      {showTaskForm && (
        <div className="lv-taskform-container">
          <form onSubmit={handleSubmit}>
            <div className="lv-taskform-titlefield">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className={!title.length || title.length > keystroke ? 'danger' : 'primary '}>{title.length}/{keystroke}</p>
            </div>
            <div className="lv-taskform-ddp">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <select name='project' onChange={(e) => setValues(e.target.value)}>
                {projects.map((project, idx) => (
                  <optgroup style={{ color: "white" }} key={idx} label={project.name}>
                    {sections.map(section => (
                      <>
                        {section.project_id === project.id && (
                          <option value={[project.id, section.id]}>{section.name}</option>
                        )}
                      </>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="lv-taskform-actions">
              <button className={`add-${!title.length || title.length > 50}`} disabled={!title.length || title.length > 50} type="submit">Add Task</button>
              <button onClick={() => setShowTaskForm(false)} className="cancel">Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="tasks-container">
        {tasks.map((task, idx) => (
          <div key={idx} className="task-card">
            <div className="task-header">
              <input type="checkbox" disabled={false} onChange={async (e) => {
                e.preventDefault()
                const payload = {
                  task_id: task.id
                }
                const res = await fetch(`/api/projects/tasks/complete`, {
                  method: 'PUT',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload)
                });
                if (res) {
                  await dispatch(getLabelTasks(labelId))
                  return res.json();
                } else {
                  return { "Message": "Unsuccessful" }
                }
              }} />
              <Link className="unfinished-task" to={`/projects/${task.project_id}/task/${task.id}`}>{task.title}</Link>
            </div>
            <div className="task-card-description">

              <p>{task.description}</p>
            </div>
            <div className={determineDue(task.due_date).includes('overdue') ? 'overdue' : 'due'}>{determineDue(task.due_date)}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default LabelView;
