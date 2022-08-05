import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSection } from "../../store/sections";

const SectionForm = ({ projectId }) => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.session.user.id);

  const [showForm, setShowForm] = useState(false);
  const [secName, setName] = useState("");
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = [];
    if (!secName.length || secName.length > 50) {
      errors.push('Section name can\'t be empty or over 50 characters.')
    };
    if (errors.length > 0) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        user_id: userId,
        project_id: projectId,
        secName
      };
      const res = await dispatch(postSection(payload));
      if (res) {
        setValErrors([]);
        setName("");
        setShowForm(false);
        setSubmitted(false);
      };
    };
  };

  return (
    <div className="add-section-field">
      {!showForm && (
        <div className="pre-section-form">
          <p>Add Section</p>
          <button onClick={() => setShowForm(true)}>+</button>
        </div>
      )}
      {showForm && (
        <div className="post-section-form">
          {valErrors.length > 0 && submitted && (
            <div className="form-errors">
              {valErrors.map((error, idx) => (
                <div className="error" key={idx}>{error}</div>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="section-inputs">
              <input type="text" placeholder="Section Name" value={secName} onChange={(e) => setName(e.target.value)} />
            </div>
            <button onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit">Add Section</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SectionForm;
