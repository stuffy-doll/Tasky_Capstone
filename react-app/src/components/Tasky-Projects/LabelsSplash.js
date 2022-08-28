import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLabel } from "../../store/labels";
import './css/labels-splash.css'

const LabelsSplash = ({ userId, projects, labels }) => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [keystroke] = useState(20);
  const [label, setLabel] = useState('');
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = [];
    if (!label.length || label.length > 20) errors.push('Label name can\'t be empty or over 50 characters.')
    if (errors.length) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        user_id: userId,
        label: label
      };
      const res = await dispatch(postLabel(payload))
      if (res) {
        setShowForm(false);
        setValErrors([]);
        setSubmitted(false);
        setLabel('');
      }
    }
  }

  return (
    <div className="labels-splash-view">
      <h1>Labels (Under Construction)</h1>
      <div className="labels-heading">
        <h4>Your Labels</h4>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>+</button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Label name..."
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <p className={label.length === 0 || label.length > keystroke ? 'danger' : 'primary'} >{label.length}/{keystroke}</p>
            <button type="submit" className="add">Add Label</button>
            <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
      </div>
      <div className="labels-list">
        {labels.map((label, idx) => (
          <div key={idx} className="label-container">
            <h4>{label.label}</h4>
          </div>
        ))}
      </div>
    </div>
  )
};

export default LabelsSplash;
