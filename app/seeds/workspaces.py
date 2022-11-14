from app.models import db, User, environment, SCHEMA, Workspace


# Adds a demo user, you can add other users here if you want
def seed_workspaces():
    demo_workspace_1 = Workspace(
         owner_id=1, name='demo workspace')
    demo_workspace_2 = Workspace(
        owner_id=2, name='demo workspace 2')
    demo_workspace_3 = Workspace(
        owner_id=3, name='demo workspace 3')
    demo_workspace_4 = Workspace(
        owner_id=4, name='demo workspace 4')

    db.session.add(demo_workspace_1)
    db.session.add(demo_workspace_2)
    db.session.add(demo_workspace_3)
    db.session.add(demo_workspace_4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
