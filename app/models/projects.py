from .db import db

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(50), nullable=False)

  user = db.relationship('User', back_populates='projects')
  sections = db.relationship('Section', back_populates='project', cascade='all, delete')
  tasks = db.relationship('Task', back_populates='project', cascade='all, delete')
  comments = db.relationship('Comment', back_populates='project', cascade='all, delete')

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "name": self.name,
    }


class Section(db.Model):
  __tablename__ = 'sections'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
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

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
  section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  due_date = db.Column(db.Date)
  is_complete = db.Column(db.Boolean, default=False)

  user = db.relationship('User', back_populates='tasks')
  project = db.relationship('Project', back_populates='tasks')
  section = db.relationship('Section', back_populates='tasks')

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

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
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
