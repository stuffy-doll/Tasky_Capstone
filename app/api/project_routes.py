from flask import Blueprint
from flask_login import login_required
from app.models import Project, Section, Task, Comment

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
