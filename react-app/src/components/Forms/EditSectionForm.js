import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSection } from '../../store/sections';

const EditSectionForm = ({ setShowForm, section }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(section.name);
  const [valErrors, setValErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    const errors = [];
    if (!name.length || name.length > 50) {
      errors.push('Section name can\'t be empty or over 50 characters.');
    };
    if (errors.length > 0) {
      setValErrors(errors);
      return;
    } else {
      const payload = {
        section_id: section.id,
        name: name,
      };
      const res = await dispatch(updateSection(payload));
      if (res) {
        setShowForm(false);
        setValErrors([]);
        setSubmitted(false);
        return;
      };
    };
  }

  return (
    <div className="section-edit-form">
      {valErrors.length > 0 && submitted && (
        <div className='form-errors'>
          {valErrors.map((error, idx) => (
            <div key={idx} className='error'>{error}</div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="section-edit-input">
          <input type="text" value={name} placeholder="Section Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="section-edit-actions">
          <button onClick={() => setShowForm(false)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditSectionForm;
