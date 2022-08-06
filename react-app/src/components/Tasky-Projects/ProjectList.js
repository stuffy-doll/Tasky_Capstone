import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import { getProjects } from '../../store/projects';
import Section from './Section';
import ProjectForm from '../Forms/ProjectForm';
import './css/project-list.css'
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
      <div className='projects-list'>
        {showModal && <ProjectForm userId={userId} showModal={setShowModal} />}
        <div className='new-project'>
          <p>New Project</p>
          <button onClick={() => setShowModal(true)}>+</button>
        </div>
        {favorites.length > 0 && (
          <div className='project-favorites'>
            <h3 className='projects-header'>Favorites</h3>
            {favorites.map((favorite, idx) => (
              <div className='project-card' key={idx}>
                <div id={`color-label-${favorite.color_label.split(' ')[0].toLowerCase()}`} />
                <Link className='project-link' to={`/projects/${favorite.id}`}>{favorite.name}</Link>
              </div>
            ))}
          </div>
        )}
        <h3 className='projects-header'>Your Projects</h3>
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
