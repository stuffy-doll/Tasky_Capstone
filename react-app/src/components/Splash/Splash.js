import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import './css/splash.css'

const Splash = () => {

  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to='/projects' />
  } else {
    return (
      <div className="splash-contents">
        <div className="tasky-logo-splash">
          <h1>Welcome to Tasky!</h1>
          <img src="https://i.imgur.com/iPeB24a.png" alt="tasky logo" />
        </div>
        <p className="tasky-splash-description">Tasky is a clone of Todoist created by Luis Sanchez-Porras. Tasky lets users create projects and manage tasks within those projects. Create an account or click the "Demo Login" button on the top right to try the app!</p>
      </div>
    )
  }
}

export default Splash;
