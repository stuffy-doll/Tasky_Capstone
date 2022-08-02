from app.models import db, Project, Section, Task, Comment
from datetime import date

def seed_projects():
  demo_x = Project(
    user_id=1, name='Demo Project'
  )

  demo_y = Project(
    user_id=1, name='Demo Project 2'
  )

  db.session.add(demo_x)
  db.session.add(demo_y)

  db.session.commit()

def seed_sections():
  demo_s_x = Section(
    user_id=1, project_id=1, name='Demo Section'
  )

  demo_s_y = Section(
    user_id=1, project_id=1, name='Demo Section'
  )

  db.session.add(demo_s_x)
  db.session.add(demo_s_y)

  db.session.commit()

def seed_tasks():
  demo_t_sx = Task(
    user_id=1, project_id=1, section_id=1, title='Demo Task', description='This is a demo task.', due_date=date.fromisoformat('2022-08-02')
  )

  demo_t_sy = Task(
    user_id=1, project_id=1, section_id=2, title='Demo Task', description='This is a demo task.'
  )

  db.session.add(demo_t_sx)
  db.session.add(demo_t_sy)

  db.session.commit()

def seed_comments():
  demo_c_x = Comment(
    user_id=1, project_id=1, content='This is a demo comment.'
  )

  db.session.add(demo_c_x)

  db.session.commit()

def undo_project():
  db.session.execute('TRUNCATE projects, sections, tasks, comments RESTART IDENTITY CASCADE')

  db.session.commit()
