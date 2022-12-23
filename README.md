# Slack-Clone 

# Table of Content

- [Technologies Used](#techonologies-used)
- [Link to Live Site](#link-to-live-site)
- [Index](#index)
- [Getting Started](#getting-started)
- [Screenshots of Usage](#screenshots-of-usage)




**slack-clone** iis a clone of [Slack](https://slack.com), Slack is a messaging app for business that connects people by allowing them to message eachother privately or in a channel. **slack-clone** I aimed to replicate the features the slack offers in frontend and backend


## Live site
[Open slack-clone](https://slack-clone.onrender.com)


## Technologies used

<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" alt="drawing" width="50"/> <img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" alt="react" width="50"> 
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" alt="redux" width="50"> 
<img src="https://www.pngall.com/wp-content/uploads/5/Python-PNG.png" alt="python" width ="50"> 
<img src="https://user-images.githubusercontent.com/92463844/162601723-beb79065-3555-4c2d-86c1-37d914e6d7ae.png" alt="flask" width ="50"> 
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" alt="postgreSQL" width="50">
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" alt="css3" width="50"> 
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" alt="html5" width="50"> 
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" alt="git" width="50"> 
<img src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" alt="vscode" width="50"> 
<img src="https://www.govconwire.com/wp-content/uploads/2018/03/AWS-EM-1.jpg" alt="aws" width="50"/> 
<img src="https://www.kindpng.com/picc/m/207-2078621_electric-bikes-socket-io-facebook-icon-in-circle.png" alt="socketio" width="50"/>

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

# Screenshots of Usage


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

