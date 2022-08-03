import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/projects';

const Project = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const projects = useSelector(state => Object.values(state.projects));

  useEffect(() => {
    dispatch(getProjects(userId))
  }, [dispatch, userId]);

  return (
    <div className='projects-list'>
      {projects.map(project => (
        <div className='project-card' key={project.id}>
          <p>{project.name}</p>
        </div>
      ))}
    </div>
  )
};

export default Project;
