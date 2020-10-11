# Tell the world your story. 
## Blog MVC

## Database Design (MongoDB)
<hr>
Schema User:

 - Username
 - Password
 - Email
 - Name
 - Profile Picture
 - Social Media Links

<hr>
Schema Blog Post 

 - Blog title
 - Blog Subtitiel
 - Blog Description
 - Blog Date
 - User
 - Comments plugin (Disqus)
<hr>

### Routing 

 - #### For backend

 - [ ] GET - /all - Read all blogs in the database (Read).
 - [ ]  POST - /new - Create a new blog in database (Create).
 - [ ]  POST - /all/<blogID> - Delete a blog post from database (Delete).
 - [ ] POST - /all/<blogID>  - Edit or patch that blog in database (Update).

 - #### For Frontend

 - [ ] / - Homepage - Landing Page
 - [ ] /all - Show all blogs 
 - [ ] /login - Auth Route for login use
 - [ ] /register - Auth Route for registering user
 - [ ] /new - Open the blog editor (Markdown Editor Component)

### Component Structure (Frontend)

 - [ ] Home Component
 - [ ]  Blog page component
 - [ ] Navbar
 - [ ] Footer
 - [ ] Login and register component

### Blog Component Dev.to case study.
- [] - Banner Image.
- [] - Bold Title
- [] - Tags like #webdev, #security etc
- [] - Profile Avatar - Name - Date - Edit date.
- [] - Article itself in markdown..
- [] - End card with info about user. and their social media links.
- [] - Discussion w/Comments
- [] - Blog suggestions 
- [] - Footer


# Render blog as a markdown 
1. Dependency #1 - @uiw/react-md-editor
2. Render the markdown - react-markdown

# Todos
- Render use profile picture on the navbar. 
- Ability to save writing as a draft.
- Animations 