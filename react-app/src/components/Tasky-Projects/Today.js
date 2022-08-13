import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const Today = () => {
  // const dispatch = useDispatch();

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

  const tasks = useSelector(state => Object.values(state.tasks))
    .filter(task => dateFormatter(task.due_date?.slice(0, -4)) === today)
    .filter(task => !task.is_complete);

  const overdue = useSelector(state => Object.values(state.tasks))
    .filter(task => determineDue(task.due_date).includes('overdue'))
    .filter(task => !task.is_complete);

  return (
    <div className='today-project-card'>
      <div className='today-icon-link'>
        <i id="calendar" className="fa fa-calendar" />
        <Link className='project-link' to='/projects'>Today</Link>
      </div>
      <div className={`task-length-${tasks.length === 0 ? 'empty' : 'populated'}`}>
        <p>{tasks.length + overdue.length}</p>
      </div>
    </div>
  )
}

export default Today;
