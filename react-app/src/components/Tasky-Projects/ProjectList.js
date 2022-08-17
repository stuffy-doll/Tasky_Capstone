import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import { getProjects } from '../../store/projects';
import ProjectForm from '../Forms/ProjectForm';
import './css/project-view.css'
import ProjectView from './ProjectView';
import TaskView from './TaskView';
import { getUserTasks } from '../../store/tasks';
import ProjectSplash from './ProjectSplash';
import Today from './Today';
import { getComments } from '../../store/comments';
import Search from '../Search/Search';

const ProjectList = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.session.user.id);
  const username = useSelector(state => state.session.user.username);
  const projects = useSelector(state => Object.values(state.projects));
  const favorites = projects.filter(project => project.is_favorite);
  const comments = useSelector(state => Object.values(state.comments));

  const [value, setValue] = useState('Loading')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    dispatch(getUserTasks(userId))
    dispatch(getProjects(userId))
    dispatch(getComments(userId))
      .then(() => {
        if (isMounted) {
          setValue('Done');
        };
      });
    return () => {
      isMounted = false;
    }
  }, [dispatch, userId]);

  const greetings = [
    `Welcome, ${username}!`,
    `Let's get to work, ${username}.`,
    `Let's get started, ${username}.`,
    `What's on the agenda today?`,
    `Hey, ${username}!`,
    `Shoutouts to Pihort!`,
    `${username}! You're here!`
  ]

  return (
    <>
      {value === 'Loading' && (
        <h2>Loading</h2>
      )}
      {value === 'Done' && (
        <main className='project-box'>
          {showModal && <ProjectForm userId={userId} showModal={setShowModal} />}
          <div className='projects-list'>
            <div className='new-project'>
              <p>New Project</p>
              <button onClick={() => setShowModal(true)}>+</button>
            </div>
            <Today />
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
          <Switch>
            <ProtectedRoute path='/projects' exact={true}>
              <div className='getting-started'>
                <h1 className='greeting'>{greetings[Math.floor(Math.random() * greetings.length)]}</h1>
                <ProjectSplash />
              </div>
            </ProtectedRoute>
            <ProtectedRoute path='/projects/:projectId' exact={true}>
              <ProjectView userId={userId} projects={projects} comments={comments} />
            </ProtectedRoute>
            <ProtectedRoute path='/projects/:projectId/task/:taskId' exact={true}>
              <TaskView />
            </ProtectedRoute>
          </Switch>
        </main>
      )}
    </>
  )
};

export default ProjectList;
