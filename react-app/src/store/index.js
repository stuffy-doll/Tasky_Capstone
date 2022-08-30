import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import projectReducer from './projects';
import sectionReducer from './sections';
import taskReducer from './tasks';
import commentsReducer from './comments';
import labelReducer from './labels';
import allReducer from './all';

const rootReducer = combineReducers({
  session,
  projects: projectReducer,
  sections: sectionReducer,
  tasks: taskReducer,
  comments: commentsReducer,
  labels: labelReducer,
  all: allReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
