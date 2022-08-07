import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import { getProjects } from '../../store/projects';
import ProjectForm from '../Forms/ProjectForm';
import './css/project-view.css'
import ProjectView from './ProjectView';

const ProjectList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const projects = useSelector(state => Object.values(state.projects));

  const favorites = projects.filter(project => project.is_favorite);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getProjects(userId))
  }, [dispatch, userId]);

  return (
    <main className='project-box'>
      {showModal && <ProjectForm userId={userId} showModal={setShowModal} />}
      <div className='projects-list'>
        <div className='new-project'>
          <p>New Project</p>
          <button onClick={() => setShowModal(true)}>+</button>
        </div>
        {favorites.length > 0 && (
          <div className='project-favorites'>
            <h4 className='projects-header'>Favorites</h4>
            {favorites.map((favorite, idx) => (
              <div className='project-card' key={idx}>
                <div id={`color-label-${favorite.color_label.split(' ')[0].toLowerCase()}`} />
                <Link className='project-link' to={`/projects/${favorite.id}`}>{favorite.name}</Link>
              </div>
            ))}
          </div>
        )}
        <h4 className='projects-header'>Your Projects</h4>
        {projects.map(project => (
          <div className='project-card' key={project.id}>
            <div id={`color-label-${project.color_label.split(' ')[0].toLowerCase()}`} />
            <Link className='project-link' to={`/projects/${project.id}`}>{project.name}</Link>
          </div>
        ))}
      </div>
      <ProtectedRoute path='/projects/:projectId' exact={true}>
        <ProjectView userId={userId} projects={projects} />
      </ProtectedRoute>
    </main>
  )
};

export default ProjectList;
