<h1 align="center">
  <br>
  <a href="http://www.semicolon-blog.netlify.app/blogs"><img src="https://i.imgur.com/eKUAJTX.png" alt="Markdownify" width="200"></a>
  
  <br>
  Semicolon
  <br>
</h1>

<h4 align="center">A markdown based blogging platform built using React and <a href="http://expressjs.com" target="_blank">ExpressJS</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#visit">Visit</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://i.imgur.com/OQkvjwK.png)
![screenshot](https://i.imgur.com/Q5YSQZI.png)

## Key Features

- Markdown Editor - Make changes, See changes
  - Instantly see what your Markdown documents look like in HTML as you create them,
- Sync Scrolling
  - While you type, LivePreview will automatically scroll to the current location you're editing.
- GitHub Flavored Markdown.
- Syntax highlighting and code support
- Dark/Light mode (Under construction)
- Toolbar for basic Markdown formatting.
- Save your blog as a draft (Under construction)
- Emoji support in preview :tada:
- Share your blog on Twitter, WhatsApp and LinkedIn
- Full screen mode
  - Write distraction free.

## Visit

You can visit [here](http://semicolon-blog.netlify.app)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/OmkarK45/blog-app

# Go into the repository
$ cd backend

# Go into the repository
$ cd frontend

# Install dependencies in backend by using 
$ npm install (wait 5mins)

# Install the frontend dependencies by using 
$ yarn install (wait 5mins)

# Setup environment variables
$ In backend folder, create a file called '.env' 
$ Declare the following variables as env vars : ACCESS_TOKEN, REFRESH_TOKEN_SECRET, JWT_SECRET='some secure string'(required), DB_URI_LOCAL=mongodb://localhost/blogdb (if db doesn't exist, it'll create one.), DB_URI_ATLAS='the url from mongo cloud atlas' (optional) 

# Run the backend
$cd backend
$ npm start

# Run the frontend by setting proxy to frontend in package.json
$ add this line at line 2 in frontend/package.json >> "proxy" : "https://localhost:3001"

# Run the frontend
$cd frontend
$ yarn start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following open source packages:

- [NodeJS](http://nodejs.org)
- [ReactJS](http://reactjs.org)
- [ExpressJS](http://expressjs.com)
- [MongoDB](http://mongodb.com)

## License

MIT

> [omkarkulkarni.netlify.app](https://www.omkarkulkarni.netlify.app) &nbsp;&middot;&nbsp;
> GitHub [@omkark45](https://github.com/omkark45) &nbsp;&middot;&nbsp;
> LinkedIn [@omkark45](https://www.linkedin.com/in/omkark45/)
