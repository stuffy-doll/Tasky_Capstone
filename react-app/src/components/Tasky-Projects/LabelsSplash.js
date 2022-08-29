import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLabel } from "../../store/labels";
import './css/labels-splash.css'
import ProtectedRoute from "../auth/ProtectedRoute";
import LabelView from "./LabelView";

const LabelsSplash = ({ userId, projects, labels }) => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [keystroke] = useState(20);
  const [label, setLabel] = useState('');
  const [colorLabel, setColorLabel] = useState('Brick Break');
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
        label: label,
        color_label: colorLabel
      };
      const res = await dispatch(postLabel(payload));
      if (res) {
        setShowForm(false);
        setValErrors([]);
        setSubmitted(false);
        setLabel('');
        setColorLabel('Brick Break')
      };
    };
  };

  const colorsv2 = [
    {
      color: 'Brick Break',
      code: '#88292F'
    },
    {
      color: 'Cherry Plum',
      code: '#F85329'
    },
    {
      color: 'Baby Peach',
      code: '#FCB2A9'
    },
    {
      color: 'Reserved Orange',
      code: '#D36135'
    },
    {
      color: 'Deep Beige',
      code: '#E5B181'
    },
    {
      color: 'Mellow Apricot',
      code: '#FFB86F'
    },
    {
      color: 'Pastel Yellow',
      code: '#FDFD96'
    },
    {
      color: 'Crawling Green',
      code: '#CADF9E'
    },
    {
      color: 'Sea Grass',
      code: '#2E8B57'
    },
    {
      color: 'Mint Blue',
      code: '#65FFEC'
    },
    {
      color: 'Bright Purple',
      code: '#CE9EFF'
    },
    {
      color: 'Perfect Sky',
      code: '#D7B9D5'
    },
    {
      color: 'Dry Bones',
      code: '#D0E1D4'
    },
    {
      color: 'Ghost Light',
      code: '#E4DEE4'
    },
    {
      color: 'Black Coral',
      code: '#5E697F'
    },
  ]

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
            <select name='color' onChange={(e) => setColorLabel(e.target.value)}>
              {colorsv2.map((color, idx) => (
                <option key={idx} style={{ color: color.code }} value={color.color}>{color.color}</option>
              ))}
            </select>
            <button type="submit" className="add">Add Label</button>
            <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
      </div>
      <div className="labels-list">
        {labels.map((label, idx) => (
          <div key={idx} className="label-container">
            <div className="label-details">
              <div id={`color-label-${label.color_label.split(' ')[0].toLowerCase()}`} />
              <Link className="label-link" to={`/projects/labels/${label.label}`}>{label.label}</Link>
            </div>
            <div className="label-actions">
              {/* <button className="add-label-task">+</button> */}
            </div>
            <ProtectedRoute path='/projects/labels/:labelLabel' exact={true} >
              <LabelView labelId={label.id} />
            </ProtectedRoute>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelsSplash;
