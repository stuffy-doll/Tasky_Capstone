from flask import Blueprint
from flask_login import login_required
from app.models import Project, Section, Task, Comment

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<user_id>')
def get_projects(user_id):
  query = Project.query.filter_by(user_id=user_id).all()
  projects = [project.to_dict() for project in query]
  print({ "projects": projects })
  return { "projects": projects }
