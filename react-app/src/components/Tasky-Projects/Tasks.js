import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../store/tasks";
import './css/task-list.css'
import TaskModal from "./TaskModal";

const TaskList = ({ sectionId }) => {
  const dispatch = useDispatch();

  const tasks = useSelector(state => Object.values(state.tasks))
    .filter(task => task?.section_id === sectionId)

  const [showModal, setShowModal] = useState(false);
  const unfinishedTasks = tasks.filter(task => !task.is_complete)
  const finishedTasks = tasks.filter(task => task.is_complete)

  useEffect(() => {
    dispatch(getTasks(sectionId));
  }, [dispatch, sectionId]);

  return (
    <div className="task-list">
      <div className="unfinished-tasklist">
        {unfinishedTasks.length === 0 && (
          <></>
        )}
        {unfinishedTasks.length > 0 && (
          <div className="unfinished-header">
            <h4>In Progress</h4>
            <p>{unfinishedTasks.length}</p>
          </div>
        )}
        {unfinishedTasks.map(task => (
          <>
            <div className="task-card" key={task.id} onClick={() => setShowModal(true)}>
              <div className="task-header">
                <input type="checkbox" disabled={false} onChange={async (e) => {
                  e.preventDefault()
                  setShowModal(false);
                  const payload = {
                    task_id: task.id
                  }
                  const res = await fetch(`/api/projects/tasks/complete`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                  });
                  if (res) {
                    await dispatch(getTasks(sectionId))
                    return res.json();
                  } else {
                    return { "Message": "Unsuccessful" }
                  }
                }} />
                <h4 className="unfinished-task">{task.title}</h4>
              </div>
              <p>{task.description}</p>
              <div>{task.due_date}</div>
            </div>
            {showModal && <TaskModal showModal={setShowModal} task={task} />}
          </>
        ))}
      </div>
      <div className="finished-tasklist">
        {finishedTasks.length === 0 && (
          <></>
        )}
        {finishedTasks.length > 0 && (
          <div className="finished-header">
            <h4>Complete</h4>
            <p>{finishedTasks.length}</p>
          </div>
        )}
        {finishedTasks.map(task => (
          <div key={task.id}>
            <div className="task-card">
              <div className='task-header'>
                <input type="checkbox" checked={true} disabled={false} onChange={async (e) => {
                  e.preventDefault();
                  const payload = {
                    task_id: task.id
                  }
                  const res = await fetch(`/api/projects/tasks/incomplete`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                  });
                  if (res) {
                    await dispatch(getTasks(sectionId))
                    setShowModal(false);
                    return res.json()
                  } else {
                    return { "Message": "Unsuccessful" }
                  }
                }} />
                <h4 className="finished-task">{task.title}</h4>
              </div>
              <p>{task.description}</p>
              <div>{task.due_date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default TaskList;
