from app.models import db, User, environment, Chat


# Adds a demo user, you can add other users here if you want
def seed_chats():
    dm1 = Chat(
        workspace_id=1, user_one_id=1, user_two_id=2)
    dm2 = Chat(
        workspace_id=1, user_one_id=2, user_two_id=3)
    dm3 = Chat(
        workspace_id=1, user_one_id=3, user_two_id=1)
    dm4 = Chat(
        workspace_id=1, user_one_id=4, user_two_id=2)

    db.session.add(dm1)
    db.session.add(dm2)
    db.session.add(dm3)
    db.session.add(dm4)
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
