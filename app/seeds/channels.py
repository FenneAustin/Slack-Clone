from app.models import db, User, environment, SCHEMA, Channel


# Adds a demo user, you can add other users here if you want
def seed_create_channels():
    demo_add_channel_1 = Channel(
         workspace_id=1, name="live-questions", owner_id=1)
    demo_add_channel_2 = Channel(
         workspace_id=2, name="project-grading", owner_id=1)
    demo_add_channel_3 = Channel(
         workspace_id=3, name="study-group", owner_id=1)
    demo_add_channel_4 = Channel(
         workspace_id=4, name="just-chatting", owner_id=1)


    db.session.add(demo_add_channel_1)
    db.session.add(demo_add_channel_2)
    db.session.add(demo_add_channel_3)
    db.session.add(demo_add_channel_4)
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
