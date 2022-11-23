from app.models import db, User, environment, Chat, Message



def seed_messages():
    message1= Message(
        user_id = 1,
        chat_id = 1,
        text= 'Do you know how to create a slack bot?',
    )
    message2= Message(
        user_id = 1,
        chat_id = 3,
        text= 'Do you know how to create a slack bot?',
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
