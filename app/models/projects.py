from .db import db

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(50), nullable=False)

  user = db.relationship('User', back_populates='projects')
  sections = db.relationship('Section', back_populates='project', cascade='all, delete')
  tasks = db.relationship('Task', back_populates='project', cascade='all, delete')
  comments = db.relationship('Comment', back_populates='project', cascade='all, delete')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'name': self.name,
    }


class Section(db.Model):
  __tablename__ = 'sections'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, primary_key=True)
  project_id = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String(50), nullable=False)

  user = db.relationship('User', back_populates='sections')
  project = db.relationship('Project', back_populates='sections')
  tasks = db.relationship('Task', back_populates='sections', cascade='all, delete')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'project_id': self.project_id,
      'name': self.name
    }


class Task(db.Model):
  __tablename__ = 'tasks'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  project_id = db.Column(db.Integer, nullable=False)
  section_id = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  due_date = db.Column(db.Date)
  is_complete = db.Column(db.Boolean)

  user = db.relationship('User', back_populates='tasks')
  project = db.relationship('Project', back_populates='tasks')
  section = db.relationship('Section', back_populates='tasks')


class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  project_id = db.Column(db.Integer, nullable=False)
  content = db.Column(db.Text)

  user = db.relationship('User', back_populates='comments')
  project = db.relationship('Project', back_populates='comments')
