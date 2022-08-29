import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSections } from "../../store/all";
import { getSections } from "../../store/sections";

const LabelView = ({ projects, labels }) => {
  const dispatch = useDispatch();
  const labelId = +useParams().labelId;
  const label = labels.find(label => label.id === labelId);

  const userId = useSelector(state => state.session.user.id);
  console.log(userId);
  const sections = useSelector(state => Object.values(state.all))
  console.log(sections);

  const today = new Date(Date.now());

  const dateFormatter = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
  }

  useEffect(() => {
    dispatch(getAllSections(userId));
  }, [dispatch, userId]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [keystroke] = useState(50);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(dateFormatter(today));
  const [values, setValues] = useState([]);

  console.log("VALUES:: ", values);

  const handleSubmit = (e) => {
    return;
  }

  return (
    <>
      <div className="label-view-heading">
        <div>
          <h3>{label.label}</h3>
        </div>
        <div className="label-view-actions">
          {!showTaskForm && (
            <button onClick={() => setShowTaskForm(true)}>+ Add Task</button>
          )}
        </div>
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
                  <optgroup key={idx} label={project.name}>
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
              <button className="add" type="submit">Add Task</button>
              <button onClick={() => setShowTaskForm(false)} className="cancel">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default LabelView;
