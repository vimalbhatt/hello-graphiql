npm install nodemon
npm install create-react-app -g
create-react-app client
npm install apollo-boost @apollo/react-hooks graphql
cd C:\vb\sandbox\graphql-playlist

nodemon app.js

#find process running on port and kill
netstat -ano|findstr "PID :3000"
taskkill /pid 15828 /f
