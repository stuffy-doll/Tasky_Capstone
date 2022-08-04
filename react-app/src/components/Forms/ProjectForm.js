import { useState } from "react";
import { useDispatch } from "react-redux";

const ProjectForm = ({ userId, showModal }) => {
  const dispatch = useDispatch();

  const [projName, setProjName] = useState("");
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [color, setColor] = useState('Brick Brown');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = [];
    if (!projName.length || projName.length > 50) {
      errors.push('Project name can\'t be empty or over 50 characters.');
    };
    if (errors.length > 0) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        user_id: userId,
        projName
      };
      const res = await dispatch();
      if (res) {
        setValErrors([]);
        setProjName("");
        setSubmitted(false);
      };
    };
  };

  const colors = [
    'Brick Brown',
    'Sea Green',
    'Baby Peach',
    'Cherry Plum',
    'Pastel Yellow'
  ];

  return (
    <div className="project-form-modal">
      <button className="x-closeModal" onClick={() => showModal(false)}>X</button>
      {valErrors.length > 0 && submitted && (
        <div className="form-errors">
          {valErrors.map((error, idx) => (
            <div className="error" key={idx}>{error}</div>
          ))}
        </div>
      )}
      <h2 className="new-project-heading">New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="project-inputs">
          <input type="text" placeholder="Project Name" value={projName} onChange={(e) => setProjName(e.target.value)} />
          <select name='color' onChange={(e) => setColor(e.target.value)}>
            {colors.map((color, idx) => (
              <option key={idx} value={color}>{color}</option>
            ))}
          </select>
        </div>

      </form>
    </div>
  )
};

export default ProjectForm;
