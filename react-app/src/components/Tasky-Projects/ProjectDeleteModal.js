import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProject } from "../../store/projects";

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
      <h3>Delete Project</h3>
      <p>Are you sure you want to delete {project.name} and {tasks.length} unfinished tasks?</p>
      <div className="project-delete-actions">
        <button onClick={() => setShowDelete(false)}>Cancel</button>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  )
};

export default ProjectDeleteModal;
