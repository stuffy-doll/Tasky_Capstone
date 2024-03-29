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
import { getLabels } from '../../store/labels';
import Labels from './Labels';
import LabelsSplash from './LabelsSplash';
import LabelView from "./LabelView";

const ProjectList = () => {
  const dispatch = useDispatch();

  const dateFormatter = (date) => {
    if (date) {
      if (date.length === 10) {
        return date;
      } else {
        date = new Date(date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
      };
    } else {
      return;
    };
  };

  const determineDue = (date) => {
    date = new Date(date?.slice(0, -4))
    const today = new Date(Date.now());

    if (today.getDate() > date.getDate()) {
      return `${today.getDate() - date.getDate()} day(s) overdue.`
    } else if (today.getDate() === date.getDate()) {
      return `Due today.`
    } else {
      date = date.toString().split(' ');
      return `Due ${date[0]}, ${date[1]} ${date[2]}`
    }
  }

  const today = dateFormatter(new Date(Date.now()))
  const userId = useSelector(state => state.session.user.id);

  const tasks = useSelector(state => Object.values(state.tasks))
    .filter(task => task.user_id === userId && dateFormatter(task.due_date?.slice(0, -4)) === today)
    .filter(task => !task.is_complete);

  const overdue = useSelector(state => Object.values(state.tasks))
    .filter(task => task.user_id === userId && determineDue(task.due_date).includes('overdue'))
    .filter(task => !task.is_complete);

  const username = useSelector(state => state.session.user.username);
  const projects = useSelector(state => Object.values(state.projects));
  const favorites = projects.filter(project => project.is_favorite);
  const comments = useSelector(state => Object.values(state.comments));
  const labels = useSelector(state => Object.values(state.labels));

  const [value, setValue] = useState('Loading')
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    dispatch(getUserTasks(userId))
    dispatch(getProjects(userId))
    dispatch(getComments(userId))
    dispatch(getLabels(userId))
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
            <Today tasks={tasks} overdue={overdue} />
            <Labels />
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
            <ProtectedRoute path='/projects/labels' exact={true}>
              <LabelsSplash userId={userId} projects={projects} labels={labels} />
            </ProtectedRoute>
            <ProtectedRoute path='/projects/:projectId' exact={true}>
              <ProjectView userId={userId} projects={projects} comments={comments} />
            </ProtectedRoute>
            <ProtectedRoute path='/projects/:projectId/task/:taskId' exact={true}>
              <TaskView />
            </ProtectedRoute>
            <ProtectedRoute path='/projects/labels/:labelId' exact={true} >
              <LabelView projects={projects} labels={labels} />
            </ProtectedRoute>
          </Switch>
        </main>
      )}
    </>
  )
};

export default ProjectList;
