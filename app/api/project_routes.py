from crypt import methods
from flask import Blueprint, request
from flask_login import login_required
from app.models import (db, User, Project, Section, Task, Comment, Label)
from datetime import date

project_routes = Blueprint('projects', __name__)

# PROJECT ROUTES

@project_routes.route('/<user_id>')
def get_projects(user_id):
  query = Project.query.filter_by(user_id=user_id).all()
  projects = [project.to_dict() for project in query]
  return { "projects": projects }

@project_routes.route('/new', methods=['POST'])
def post_project():
  data = request.json
  if data:
    project = Project(
      user_id=data['user_id'],
      name=data['projName'],
      color_label=data['colorLabel'],
      is_favorite=data['favorited']
    )
    db.session.add(project)
    db.session.commit()
    return project.to_dict()

@project_routes.route('/<project_id>/update', methods=['PUT'])
def update_project(project_id):
  project = Project.query.get(project_id)
  data = request.json
  if data:
    project.name = data['name']
    project.color_label = data['color']
    project.is_favorite = data['favorite']
    db.session.commit()
    return project.to_dict()

@project_routes.route('/<project_id>/delete', methods=['DELETE'])
def delete_project(project_id):
  project = Project.query.get(project_id)
  db.session.delete(project)
  db.session.commit()
  return project.to_dict()

# TASK ROUTES

@project_routes.route('/tasks/<project_id>')
def get_tasks(project_id):
  query = Task.query.filter_by(project_id=project_id).all()
  tasks = [task.to_dict() for task in query]
  return { "tasks": tasks }

@project_routes.route('/tasks/user/<user_id>')
def get_tasks_by_user(user_id):
  query = Task.query.filter_by(user_id=user_id).all()
  tasks = [task.to_dict() for task in query]
  return { "uTasks": tasks }

@project_routes.route('/tasks/labels/<task_id>')
def get_task_labels(task_id):
  task = Task.query.get(task_id)
  labels = [label.to_dict() for label in task.task_labels]
  return {
    "labels": labels
  };

@project_routes.route('/tasks/new', methods=['POST'])
def post_task():
  data = request.json
  if data:
    task = Task(
      user_id=data['user_id'],
      project_id=data['project_id'],
      section_id=data['section_id'],
      title=data['title'],
      description=data['description'],
      due_date=data['due_date'],
      is_complete=False
    )
    db.session.add(task)
    db.session.commit()
    return task.to_dict()

@project_routes.route('/tasks/complete', methods=['PUT'])
def complete_task():
  data = request.json
  task = Task.query.get(data['task_id'])
  task.is_complete = True
  db.session.commit()
  return task.to_dict()

@project_routes.route('/tasks/incomplete', methods=['PUT'])
def incomplete_task():
  data = request.json
  task = Task.query.get(data['task_id'])
  task.is_complete = False
  task.due_date = date.today()
  db.session.commit()
  return task.to_dict()

@project_routes.route('/tasks/<task_id>/update', methods=['PUT'])
def update_task(task_id):
  print(task_id)
  data = request.json
  task = Task.query.get(task_id)
  if data:
    task.title = data['title']
    task.description = data['description']
    task.due_date = data['due_date']
    db.session.commit()
    return task.to_dict();

@project_routes.route('/tasks/<task_id>/delete', methods=['DELETE'])
def delete_task(task_id):
  task = Task.query.get(task_id)
  if len(task.task_labels) > 0:
    for label in task.task_labels:
      task.task_labels.remove(label)
    db.session.commit()
  db.session.delete(task)
  db.session.commit()
  return task.to_dict()

# SECTION ROUTES

@project_routes.route('/sections/<project_id>')
def get_sections(project_id):
  query = Section.query.filter_by(project_id=project_id).all()
  sections = [section.to_dict() for section in query]
  return { "sections": sections }

@project_routes.route('/sections/user/<user_id>')
def get_all_sections(user_id):
  query = Section.query.filter_by(user_id=user_id).all()
  print("SECTION QUERY:: ", query);
  sections = [section.to_dict() for section in query]
  return { "allSections": sections }

@project_routes.route('/sections/new', methods=['POST'])
def post_section():
  data = request.json
  if data:
    section = Section(
      user_id=data['user_id'],
      project_id=data['project_id'],
      name=data['secName']
    )
    db.session.add(section)
    db.session.commit()
    print(section.to_dict())
    return section.to_dict()

@project_routes.route('/sections/update', methods=['PUT'])
def update_section():
  data = request.json
  if data:
    section = Section.query.get(data['section_id'])
    section.name = data['name']
    db.session.commit()
    return section.to_dict()

@project_routes.route('/sections/<section_id>/delete', methods=['DELETE'])
def delete_section(section_id):
  section = Section.query.get(section_id)
  db.session.delete(section)
  db.session.commit()
  return section.to_dict()

# COMMENT ROUTES

@project_routes.route('/comments/<user_id>')
def get_comments(user_id):
  query = Comment.query.filter_by(user_id=user_id).all()
  comments = [comment.to_dict() for comment in query]
  return { "comments": comments }

# LABEL ROUTES

@project_routes.route('/labels/<user_id>')
def get_labels(user_id):
  query = Label.query.filter_by(user_id=user_id).all()
  labels = [label.to_dict() for label in query]
  return { "labels": labels }

@project_routes.route('/labels/new', methods=['POST'])
def post_label():
  data = request.json
  if data:
    label = Label(
      user_id=data['user_id'],
      label=data['label'],
      color_label=data['color_label']
    )
    db.session.add(label)
    db.session.commit()
    return label.to_dict()

@project_routes.route('/labels/relate', methods=['PUT'])
def label_task():
  data = request.json
  print(data)
  task = Task.query.get(data['task_id'])
  label = Label.query.get(data['label_id'])
  task.task_labels.append(label)
  label.label_tasks.append(task)
  db.session.commit()
  return {
    'task_id': task.id,
    'label_id': label.id
  }

@project_routes.route('/labels/tasks/<label_id>')
def get_label_tasks(label_id):
  label = Label.query.get(label_id)
  tasks = [task.to_dict() for task in label.label_tasks]
  return {
    "tasks": tasks
  }

@project_routes.route('/labels/<label_id>/update', methods=['PUT'])
def update_label(label_id):
  data = request.json
  label = Label.query.get(label_id)
  label.label = data['label']
  label.color_label = data['color_label']
  db.session.commit()
  return label.to_dict()
