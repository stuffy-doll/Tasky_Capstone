import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../store/projects";

const ProjectEditModal = ({ project, setShowEdit }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(project.name);
  const [keystroke] = useState(50);
  const [color, setColor] = useState(project.color_label);
  const [favorite, setFavorite] = useState(project.is_favorite);
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = [];
    if (!name.length || name.length > 50) {
      errors.push('Project name can\'t be empty or over 50 characters.')
    };
    if (errors.length > 0) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        project_id: project.id,
        name,
        color,
        favorite
      };
      const res = await dispatch(updateProject(payload));
      if (res) {
        setSubmitted(false);
        setValErrors([]);
        setShowEdit(false);
      };
    };
  };

  console.log(favorite);

  const colorsv2 = [
    {
      color: 'Brick Brown',
      code: '#B22222'
    },
    {
      color: 'Sea Green',
      code: '#2E8B57'
    },
    {
      color: 'Baby Peach',
      code: '#FCB2A9'
    },
    {
      color: 'Cherry Plum',
      code: '#F85329'
    },
    {
      color: 'Pastel Yellow',
      code: '#FDFD96'
    },
    {
      color: 'Mint Blue',
      code: '#65FFEC'
    },
    {
      color: 'Bright Purple',
      code: '#CE9EFF'
    }
  ];

  return (
    <div className="project-edit-modal">
      <div className="project-edit-box">
        {valErrors.length > 0 && submitted && (
          <div className="form-errors">
            {valErrors.map((error, idx) => (
              <div key={idx} className={error}>{error}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleEdit}>
          <div className="project-edit-inputs">
            <div className="project-edit-inputs-title">
              <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
              <p className={name.length > keystroke ? 'danger' : 'primary'}>{name.length}/{keystroke}</p>
            </div>
            <select name='color' onChange={(e) => setColor(e.target.value)}>
              {colorsv2.map((color, idx) => (
                <option key={idx} style={{ fontWeight: '2px', backgroundColor: '#3E3E3E', color: color.code }} value={color.color}>{color.color}</option>
              ))}
            </select>
            <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(!favorite)} />
          </div>
          <div className="project-edit-actions">
            <button onClick={() => setShowEdit(false)}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default ProjectEditModal;