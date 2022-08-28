import { useState } from "react";
import { useDispatch } from "react-redux";
import './css/labels-splash.css'

const LabelsSplash = ({ userId, projects, labels }) => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <button type="submit" className="add">Add Label</button>
            <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  )
};

export default LabelsSplash;
