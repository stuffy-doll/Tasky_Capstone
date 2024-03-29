from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date, timedelta

tasks_labels = db.Table('tasks_labels',
  db.Model.metadata,
  db.Column('tasks', db.Integer, db.ForeignKey('tasks.id'), primary_key=True),
  db.Column('labels', db.Integer, db.ForeignKey('labels.id'), primary_key=True))

class Project(db.Model):
  __tablename__ = 'projects'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasky_users.id')), nullable=False)
  name = db.Column(db.String(50), nullable=False)
  color_label = db.Column(db.String, nullable=False)
  is_favorite = db.Column(db.Boolean, default=False)
  is_default = db.Column(db.Boolean, default=False)

  user = db.relationship('User', back_populates='projects')
  sections = db.relationship('Section', back_populates='project', cascade='all, delete')
  tasks = db.relationship('Task', back_populates='project', cascade='all, delete')
  comments = db.relationship('Comment', back_populates='project', cascade='all, delete')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "name": self.name,
      "color_label": self.color_label,
      "is_favorite": self.is_favorite,
      "is_default": self.is_default,
    }


class Section(db.Model):
  __tablename__ = 'sections'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasky_users.id')), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
  name = db.Column(db.String(50), nullable=False)

  user = db.relationship('User', back_populates='sections')
  project = db.relationship('Project', back_populates='sections')
  tasks = db.relationship('Task', back_populates='section', cascade='all, delete')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "project_id": self.project_id,
      "name": self.name
    }


class Task(db.Model):
  __tablename__ = 'tasks'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasky_users.id')), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
  section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('sections.id')), nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  due_date = db.Column(db.Date, default=(date.today() + timedelta(days=7)))
  is_complete = db.Column(db.Boolean, default=False)

  user = db.relationship('User', back_populates='tasks')
  project = db.relationship('Project', back_populates='tasks')
  section = db.relationship('Section', back_populates='tasks')
  task_labels = db.relationship('Label', secondary=tasks_labels, back_populates='label_tasks')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "project_id": self.project_id,
      "section_id": self.section_id,
      "title": self.title,
      "description": self.description,
      "due_date": self.due_date,
      "is_complete": self.is_complete
    }


class Comment(db.Model):
  __tablename__ = 'comments'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasky_users.id')), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
  content = db.Column(db.Text)

  user = db.relationship('User', back_populates='comments')
  project = db.relationship('Project', back_populates='comments')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "project_id": self.project_id,
      "content": self.content
    }

class Label(db.Model):
  __tablename__ = 'labels'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasky_users.id')), nullable=False)
  label = db.Column(db.String(20), nullable=False)
  color_label = db.Column(db.String, nullable=False)

  user = db.relationship('User', back_populates='labels')
  label_tasks = db.relationship('Task', secondary=tasks_labels, back_populates='task_labels')

  def to_dict(self):
    return {
      "id": self.id,
      "label": self.label,
      "color_label": self.color_label,
    }
