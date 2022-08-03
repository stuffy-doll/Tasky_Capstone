import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../store/tasks";

const TaskList = ({ sectionId }) => {
  const dispatch = useDispatch();

  const tasks = useSelector(state => Object.values(state.tasks))
    .filter(task => task?.section_id === sectionId)

  useEffect(() => {
    dispatch(getTasks(sectionId));
  }, [dispatch, sectionId]);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className="task-card" key={task.id}>
          {task.title}
          {task.description}
          {task.due_date}
        </div>
      ))}
    </div>
  )
};

export default TaskList;
