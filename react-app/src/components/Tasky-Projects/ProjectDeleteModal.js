import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProject } from "../../store/projects";
import './css/delete-project-modal.css'

const ProjectDeleteModal = ({ project, setShowDelete }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tasks = useSelector(state => Object.values(state.tasks)
    .filter(task => task.project_id === project.id)
    .filter(task => !task.is_complete))

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteProject(project.id));
    setShowDelete(false);
    history.push('/projects');
  };

  return (
    <div className="project-delete-modal">
      <div className="project-delete">
        <h2>Delete Project</h2>
        <p>Are you sure you want to delete {project.name} and {tasks.length} unfinished tasks?</p>
        <div className="project-delete-actions">
          <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
          <button className="save" onClick={handleDelete}>Confirm</button>
        </div>
      </div>
    </div>
  )
};

export default ProjectDeleteModal;
