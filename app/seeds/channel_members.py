from app.models import db, User, environment, SCHEMA, ChannelMember


# Adds a demo user, you can add other users here if you want
def seed_channel_members():
    demo_add_channelmember_1 = ChannelMember(
         user_id=1, channel_id=1, permission_id=1)
    demo_add_channelmember_2 = ChannelMember(
         user_id=2, channel_id=1, permission_id=1)
    demo_add_channelmember_3 = ChannelMember(
         user_id=3, channel_id=1, permission_id=1)
    demo_add_channelmember_4 = ChannelMember(
         user_id=4, channel_id=1, permission_id=1)


    db.session.add(demo_add_channelmember_1)
    db.session.add(demo_add_channelmember_2)
    db.session.add(demo_add_channelmember_3)
    db.session.add(demo_add_channelmember_4)
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
