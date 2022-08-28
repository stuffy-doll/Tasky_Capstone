from app.models import (db, Project, Section, Task, Comment, Label)
from datetime import date

def seed_projects():
  demo_x = Project(
    user_id=1, name='Your Tasks', color_label='Default Coal', is_favorite=False, is_default=True
  )

  demo_y = Project(
    user_id=1, name='Demo Project 2', color_label='Baby Peach', is_favorite=True, is_default=False
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

  demo_s_z = Section(
    user_id=1, project_id=2, name='Demo Section'
  )

  demo_s_s = Section(
    user_id=1, project_id=2, name='Demo Section'
  )

  db.session.add(demo_s_x)
  db.session.add(demo_s_y)
  db.session.add(demo_s_z)

  db.session.commit()

def seed_tasks():
  demo_t_sx = Task(
    user_id=1, project_id=1, section_id=1, title='Demo Task', description='This is a demo task.', due_date=date.fromisoformat('2022-08-14')
  )

  demo_t_sy = Task(
    user_id=1, project_id=1, section_id=2, title='Demo Task', description='This is an overdue task.', due_date=date.fromisoformat('2022-08-03')
  )

  demo_t_sz = Task(
    user_id=1, project_id=2, section_id=3, title='Demo Task', description='This is a demo task.'
  )

  db.session.add(demo_t_sx)
  db.session.add(demo_t_sy)
  db.session.add(demo_t_sz)

  db.session.commit()

def seed_comments():
  demo_c_x = Comment(
    user_id=1, project_id=1, content='This is a demo comment.'
  )

  db.session.add(demo_c_x)

  db.session.commit()

def seed_labels():
  demo_l_x = Label(
    user_id=1, label='work'
  )

  db.session.add(demo_l_x)

  db.session.commit()

def undo_project():
  db.session.execute('TRUNCATE projects, sections, tasks, comments RESTART IDENTITY CASCADE')

  db.session.commit()
