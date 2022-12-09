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

##Features
### Workspaces
* Can Create a workspace
* User can view a list of workspace they are in
* User can invite another to workspace
* User can edit workspace info
* User can delete there own workspaces
* Owner of workspace can remove members

### Channels
* User can create a channel
* User can get a list of channel of their own workspace
* User can add another user within workspace to a channel
* User can join a channel
* User can leave a channel

### Direct Messages
* User can dm a person in their workspace
* User can search for other users within workspace to dm
* User can delete entire conversation
* User can edit messages sent in a chat

### Invitations to workspace
* User can inivite another user to workspace by email
* User can view an invitations they have received
* User can deny invitations or accept
* Owner can cancel a invitations sent to another user




