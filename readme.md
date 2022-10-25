Project

#Peludos

Description

Peludos es una web donde encontraras los mejores productos para tu mascota y los más valorados, también podrás subir tus productos favoritos.

User Stories
404 - 
500 - 
homepage - 
sign up - 
login - 
logout - 
events list - 
events create - 
events detail - 
event attend - 
Backlog
List of other features outside of the MVPs scope

User profile:

see my profile
upload my profile picture
see other users profile
list of events created by the user
list events the user is attending
Geo Location:

add geolocation to events when creating
show event in a map in event detail page
show all events in a map in the event list page
Homepage

...
ROUTES:
GET /

renders the homepage
GET /auth/signup

redirects to / if user logged in
renders the signup form (with flash msg)
POST /auth/signup

redirects to / if user logged in
body:
username
email
password
GET /auth/login

redirects to / if user logged in
renders the login form (with flash msg)
POST /auth/login

redirects to / if user logged in
body:
username
password
POST /auth/logout

body: (empty)
GET /events

renders the event list + the create form
POST /events/create

redirects to / if user is anonymous
body:
name
date
location
description
GET /events/:id

renders the event detail page
includes the list of attendees
attend button if user not attending yet
POST /events/:id/attend

redirects to / if user is anonymous
body: (empty - the user is already stored in the session)
Models
User model

username: String
password: String
Event model

owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]