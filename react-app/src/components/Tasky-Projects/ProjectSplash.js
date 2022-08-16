import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getUserTasks } from "../../store/tasks";
import './css/project-splash.css'

const ProjectSplash = () => {
  const dispatch = useDispatch();

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

  const dateMaker = (date) => {
    date = date.toString().split(' ');
    return `Due ${date[0]} ${date[1]} ${date[2]}`
  }

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

  const today = dateFormatter(new Date(Date.now()))

  const userId = useSelector(state => state.session.user.id);
  const tasks = useSelector(state => Object.values(state.tasks))
    .filter(task => dateFormatter(task.due_date?.slice(0, -4)) === today)
    .filter(task => !task.is_complete);

  const overdue = useSelector(state => Object.values(state.tasks))
    .filter(task => determineDue(task.due_date).includes('overdue'))
    .filter(task => !task.is_complete);

  useEffect(() => {
    dispatch(getUserTasks(userId))
  }, [dispatch, userId])

  return (
    <div className="tasks-due-today">
      {tasks.length === 0 && (
        <h2>No tasks due today! You're on track! </h2>
      )}
      {tasks.length > 0 && (
        <div className="tasks-due-today">
          <h2 className="project-splash-header">Tasks that need your attention today!</h2>
          <div className="task-card-wrapper">
            {tasks.map((task, idx) => (
              <div className="task-splash-card" key={idx}>
                <div className="check-title">
                  <input type="checkbox" checked={task.is_complete} onChange={async (e) => {
                    e.preventDefault();
                    const payload = {
                      task_id: task.id
                    };
                    const response = await fetch(`/api/projects/tasks/complete`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    if (response.ok) {
                      dispatch(getUserTasks(userId))
                      return response.json()
                    } else {
                      return {
                        "Message": "Unsuccessful"
                      }
                    }
                  }} />
                  <Link className="today-link" to={`/projects/${task.project_id}/task/${task.id}`}>{task.title}</Link>
                </div>
                <p className="due">{dateMaker(task.due_date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {overdue.length > 0 && (
        <div className="overdue-due-today">
          <h2 className="overdue-splash-header">Overdue tasks!</h2>
          <div className="overdue-card-wrapper">
            {overdue.map((task, idx) => (
              <div className="task-splash-card" key={idx}>
                <div className="check-title">
                  <input type="checkbox" checked={task.is_complete} onChange={async (e) => {
                    e.preventDefault()
                    const payload = {
                      task_id: task.id
                    };
                    const response = await fetch(`/api/projects/tasks/complete`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    if (response.ok) {
                      dispatch(getUserTasks(userId))
                      return response.json()
                    } else {
                      return {
                        "Message": "Unsuccessful"
                      }
                    }
                  }} />
                  <Link className="overdue-today-link" to={`/projects/${task.project_id}/task/${task.id}`}>{task.title}</Link>
                </div>
                <p className="overdue">{dateMaker(task.due_date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectSplash;
