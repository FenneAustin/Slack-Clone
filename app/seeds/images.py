from app.models import db, User, environment, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    im1 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670100105/profile-pic-5_xjtiky.jpg")
    im2 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670100105/profile-pic2_urnmzf.jpg")
    im3 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670100105/profile-pic-4_ulh6x2.jpg")
    im4 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670100105/profile-pic_tw5q2z.webp")
    wkim1 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670101929/APPACADEMY-LOGO_kthafk.png")
    wkim2 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670102050/COMPANYLOGO_ghudq9.jpg")
    wkim3 = Image(
        url =   "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670102684/logotest_zmpaur.jpg")
    wkim4 = Image(
        url = "https://res.cloudinary.com/dugmjvzmx/image/upload/v1670102684/company-logo_vv2xxz.jpg")

    db.session.add(im1)
    db.session.add(im2)
    db.session.add(im3)
    db.session.add(im4)
    db.session.add(wkim1)
    db.session.add(wkim2)
    db.session.add(wkim3)
    db.session.add(wkim4)
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
