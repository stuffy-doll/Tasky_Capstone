from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Project, Section, Task, Comment

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<user_id>')
def get_projects(user_id):
  query = Project.query.filter_by(user_id=user_id).all()
  projects = [project.to_dict() for project in query]
  return { "projects": projects }

@project_routes.route('/sections/<project_id>')
def get_sections(project_id):
  query = Section.query.filter_by(project_id=project_id).all()
  sections = [section.to_dict() for section in query]
  return { "sections": sections }

@project_routes.route('/tasks/<section_id>')
def get_tasks(section_id):
  query = Task.query.filter_by(section_id=section_id).all()
  tasks = [task.to_dict() for task in query]
  return { "tasks": tasks }

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
    db.session.commit()
    return task.to_dict();

@project_routes.route('/tasks/<task_id>/delete', methods=['DELETE'])
def delete_task(task_id):
  task = Task.query.get(task_id)
  print(task)
  db.session.delete(task)
  db.session.commit()
  return task.to_dict()

@project_routes.route('/sections/new', methods=['POST'])
def post_section():
  data = request.json
  print("DATA:: ", data)
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
