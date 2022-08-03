from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Project, Section, Task, Comment

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<user_id>')
def get_projects(user_id):
  query = Project.query.filter_by(user_id=user_id).all()
  projects = [project.to_dict() for project in query]
  return { "projects": projects }

@project_routes.route('sections/<project_id>')
def get_sections(project_id):
  query = Section.query.filter_by(project_id=project_id).all()
  sections = [section.to_dict() for section in query]
  return { "sections": sections }

@project_routes.route('tasks/<section_id>')
def get_tasks(section_id):
  query = Task.query.filter_by(section_id=section_id).all()
  tasks = [task.to_dict() for task in query]
  return { "tasks": tasks }

@project_routes.route('/new', methods=['POST'])
def post_task():
  data = request.json
  print("DATA:: ", data)
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
    db.session.add(task);
    db.session.commit();
    print("TASK:: ", task.to_dict())
    return task.to_dict();
