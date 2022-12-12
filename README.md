# Slack-Clone 

**slack-clone** iis a clone of [Slack](https://slack.com), Slack is a messaging app for business that connects people by allowing them to message eachother privately or in a channel. **slack-clone** I aimed to replicate the features the slack offers in frontend and backend


## Live site
[Open slack-clone](https://slack-clone.onrender.com)


## Technologies used
### Frontend
* Javascript
* React
* Redux
* SocketIO

### Backend
 * Python
 * Flask
 * SqlAlchemy
 * SocketIO
 * PostgreSQL

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies
      ```
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Navigate to `react-app`

7. Install dependencies
```
npm install
```

8. Start the frontend server
```
npm start
```

The application will now be running at http://localhost:3000/


![landing](https://user-images.githubusercontent.com/90361430/207135465-17eac39a-a8ec-466c-ae8c-2ce073e89101.JPG)

##Features
### Workspaces
* Can Create a workspace
* User can view a list of workspace they are in
* User can invite another to workspace
* User can edit workspace info
* User can delete there own workspaces
* Owner of workspace can remove members

![noworkspace](https://user-images.githubusercontent.com/90361430/207135741-2c629626-ab63-4c75-9e8d-0fe790e7f7a6.JPG)
![creating a workspace](https://user-images.githubusercontent.com/90361430/207135921-cfed6ff3-b020-4c38-93e1-c12050f68c93.JPG)

![admin for workspace](https://user-images.githubusercontent.com/90361430/207136396-5391cc37-37e5-41a3-9da9-c015b84c3725.JPG)

### Channels
* User can create a channel
* User can get a list of channel of their own workspace
* User can add another user within workspace to a channel
* User can join a channel
* User can leave a channel

![channelsex](https://user-images.githubusercontent.com/90361430/207137684-b69236b6-ce21-45d6-a465-02db8cc87982.JPG)


![create a channel](https://user-images.githubusercontent.com/90361430/207136595-31583933-3671-4cee-973a-f334b1a6da18.JPG)

![editchannel](https://user-images.githubusercontent.com/90361430/207136700-b130b540-bd9d-4946-9ee3-1ddd7a37a361.JPG)


### Direct Messages
* User can dm a person in their workspace
* User can search for other users within workspace to dm
* User can delete entire conversation
* User can edit messages sent in a chat
![dm](https://user-images.githubusercontent.com/90361430/207136813-12487c7b-8a1d-4db8-afa5-82b182d1fe85.JPG)
![dmm a user](https://user-images.githubusercontent.com/90361430/207136997-37316f7a-052a-4f12-8577-8c56e21f1693.JPG)


### Invitations to workspace
* User can inivite another user to workspace by email
* User can view an invitations they have received
* User can deny invitations or accept
* Owner can cancel a invitations sent to another user

![invite](https://user-images.githubusercontent.com/90361430/207137105-81f373b0-35e1-44d6-9629-35e249b5024a.JPG)


![acceptinvite](https://user-images.githubusercontent.com/90361430/207137398-4a09e89c-98b5-4f2c-94dd-9d2afdf5bda9.JPG)

