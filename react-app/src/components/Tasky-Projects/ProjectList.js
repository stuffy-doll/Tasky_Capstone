import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import { getProjects } from '../../store/projects';
import Section from './Section';

const ProjectList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const projects = useSelector(state => Object.values(state.projects));

  useEffect(() => {
    dispatch(getProjects(userId))
  }, [dispatch, userId]);

  return (
    <main className='project-box'>
      <div className='projects-list'>
        {projects.map(project => (
          <div className='project-card' key={project.id}>
            <Link className='project-link' to={`/projects/${project.id}`}>{project.name}</Link>
          </div>
        ))}
      </div>
      <ProtectedRoute path='/projects/:projectId' exact={true}>
        <Section userId={userId} projects={projects} />
      </ProtectedRoute>
    </main>
  )
};

export default ProjectList;
