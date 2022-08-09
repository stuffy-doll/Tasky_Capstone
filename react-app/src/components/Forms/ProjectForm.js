import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postProject } from "../../store/projects";
import './css/project-modal.css'

const ProjectForm = ({ userId, showModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [projName, setProjName] = useState("");
  const [keystroke] = useState(50);
  const [colorLabel, setColorLabel] = useState("Brick Brown");
  const [favorited, setFavorited] = useState(false);
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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
        projName,
        colorLabel,
        favorited
      };
      const res = await dispatch(postProject(payload));
      if (res) {
        setValErrors([]);
        setProjName("");
        setColorLabel("Brick Brown");
        setFavorited(false);
        setSubmitted(false);
        showModal(false);
        history.push(`/projects/${res.id}`)
      };
    };
  };

  const handleChange = () => {
    setFavorited(!favorited);
  };

  const colors = [
    'Brick Brown',
    'Sea Green',
    'Baby Peach',
    'Cherry Plum',
    'Pastel Yellow',
    'Mint Blue',
    'Bright Purple'
  ];

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
      color: 'Kobold Skin',
      code: '#3D314A'
    },
    {
      color: 'Perfect Sky',
      code: '#D7B9D5'
    },
    {
      color: 'River Medicine',
      code: '#313628'
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
    <div className="modal">
      <div className="project-form-modal">
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
            <p className={projName.length > keystroke ? 'danger' : 'primary'}>{projName.length}/{keystroke}</p>
            <select name='color' onChange={(e) => setColorLabel(e.target.value)}>
              {colorsv2.map((color, idx) => (
                <option key={idx} style={{ color: color.code }} value={color.color}>{color.color}</option>
              ))}
            </select>
            <div className="set-favorite">
              <p>Favorite: </p>
              <input type="checkbox" value={favorited} onChange={handleChange} />
            </div>
            <div className="new-project-buttons">
              <button className="cancel" onClick={() => showModal(false)}>Cancel</button>
              <button className="add" type="submit">Create Project</button>
            </div>
          </div>

        </form>
      </div >
    </div >
  )
};

export default ProjectForm;
