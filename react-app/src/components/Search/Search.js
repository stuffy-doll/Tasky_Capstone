import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserTasks } from "../../store/tasks";

const Search = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState([]);

  const dateMaker = (date) => {
    date = date.toString().split(' ');
    return `Due ${date[0]} ${date[1]} ${date[2]}`
  }

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

  const dateFormatter = (date) => {
    if (date) {
      if (date.length === 10) {
        return date;
      } else if (date.length === 29) {
        date = new Date(date.slice(0, -4));
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
      }
      else {
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

  const userId = useSelector(state => state.session.user.id);
  const tasks = useSelector(state => Object.values(state.tasks));
  const projects = useSelector(state => Object.values(state.projects));
  let results = [];

  const projectFinder = (projArr, task) => {
    return projArr.find(project => project.id === task.project_id)
  }

  useEffect(() => {
    dispatch(getUserTasks(userId))
  }, [dispatch, userId])

  const today = dateFormatter(new Date(Date.now()))

  const filterTasks = (e) => {
    if (e.target.value) {
      results = tasks.filter(task =>
        (!task.is_complete && task.title.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    };
    if (e.target.value === '#TODAY'.toLowerCase()) {
      results = tasks.filter(task =>
        dateFormatter(task.due_date) === today)
    }
    if (e.target.value === '#OVERDUE'.toLowerCase()) {
      results = tasks.filter(task =>
        (!task.is_complete && determineDue(task.due_date).includes('overdue')))
    }
    setSearch(results)
  }

  return (
    <>
      <div className="search-container">
        <div className="search-bar-view">
          <div className="search-bar">
            <i id="search" className="fa fa-search" />
            <input
              className="search-tasks"
              type="text"
              placeholder="Search tasks..."
              onChange={filterTasks} />
          </div>
        </div>
      </div>
      <div className="results-container">
        {search.map(result => (
          <Link
            key={result.id} to={`/projects/${result.project_id}/task/${result.id}`}
            onClick={() => setSearch([])}>
            <div className="single-result">
              <p className="result-title">{result.title}</p>
              <p className={determineDue(result.due_date).includes('overdue') ? 'overdue' : 'due'}>{dateMaker(result.due_date)}</p>
              <div className="in-project">
                <div id={`color-label-${projectFinder(projects, result).color_label.split(' ')[0].toLowerCase()}`} />
                <p className="result-project">In: {projectFinder(projects, result).name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Search;
