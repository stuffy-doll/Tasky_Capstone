from flask import Blueprint, jsonify, session, request
from app.models import User, db, Project, Section, Task
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import date

from app.models.projects import Project

auth_routes = Blueprint('auth', __name__)

def fill_user_defaults(user):
    user_default = Project(
        user_id=user.id,
        name='Your Tasks',
        color_label='Default Coal',
        is_favorite=False,
        is_default=True
    )
    db.session.add(user_default)
    db.session.commit()
    print("::PROJECT PASS::")
    getting_started = Section(
        user_id=user.id,
        project_id=user_default.id,
        name='Getting Started'
    )
    db.session.add(getting_started)
    db.session.commit()
    print("::SECTION PASS::")
    t1 = Task(
        user_id=user.id,
        project_id=user_default.id,
        section_id=getting_started.id,
        title='Create a Project!',
        description=f'Hi, {user.username}! Create a new project by pushing the "+" button on the side bar.',
        due_date=date.today(),
        is_complete=False
    )
    t2 = Task(
        user_id=user.id,
        project_id=user_default.id,
        section_id=getting_started.id,
        title='Adding Sections',
        description='Add a new section using the "+" button in the "Add Section" field of a project. You can add as many sections as you want to a project!',
        due_date=date.today(),
        is_complete=False
    )
    t3 = Task(
        user_id=user.id,
        project_id=user_default.id,
        section_id=getting_started.id,
        title='Adding Tasks',
        description='Tasks are added by using the "+" button in a section. Task due dates default to today! You can even add a brief (or long) description to a task if you so choose, but tasks must have a title.',
        due_date=date.today(),
        is_complete=False
    )
    t4 = Task(
        user_id=user.id,
        project_id=user_default.id,
        section_id=getting_started.id,
        title='Modifying Tasks',
        description='Click on the title of this task or any task you create! You will be taken to a page with all of the tasks details, and you can modify a task from that page. Tasks can be marked as complete or incomplete conveniently from the project page!',
        due_date=date.today(),
        is_complete=False
    )
    t5 = Task(
        user_id=user.id,
        project_id=user_default.id,
        section_id=getting_started.id,
        title='Happy Tasking!',
        description='Feel free to delete this section if you want, and thanks for visiting Tasky!',
        due_date=date.today(),
        is_complete=False
    )
    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.commit()
    pass


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}



@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        fill_user_defaults(user)
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
