# My Blog

This is a single page BlogSite template. 

## Motivation

I have created it to improve my React skills. I am new at web development. In a proverb it says: "I forget what I hear, I remember what I see, I know what I do." This is my third React project. in every next project I recognize what I did wrong in the previous projects. When I was doing this project I was also thinking about optimizing my previous projects. So in short I am keep learning. 

## Tech/framework used
The project is generated by [React](https://facebook.github.io/create-react-app)  [Redux], [axios], [react-helmet], [moment], [react-router],[redux-thunk],[react-ckeditor-component]. For Backend [LoopBack3] is used.

# Features
I will explain feautures of the site from top to down.

### TopNav

In the top nav a there are language selection links. Application is multilinguale. It supports English (en) Turkish (tr) and German (de) languages. Menu languages changes according to the selected language. I used three [i18n]() files to keep translations of these languages in json format. I handle the selected language in the [languageReducer]. I also save users language preference in the local storage. When page loads user will allways see his/her selected language.

For date and time I used [moment] library. By the help of a small condition user sees date time in his/her selected language.

Every article has a language key. User sees articles only in his/her langugae.

###NavBar

I chose a fixed navbar. When the widt is less than 740 pixels it collapses.
Every Component in the navbar is located under [navbar] folder and folder names are self explenatory.

BrandName: It is linked to "/".
About: It is linked to "/about".
Terms: It is linked to "/terms".
Categories: Every article has a category key in the db. This link lists category names and counts of articles in that category.

The links following are visible according to authentication.
All authentication components are located in the [auth] folder.
Login: It is linked to "/signin" with the component [Authentication].

[Addarticle] link is visible to the powerusers and the admin, [users] link is visible to only admin.

The link with the userName directs to the password change component.

###Sidebar

There are three containers in the Sidebar container. 

Last Articles: Lists the titles of recent three articles and contains a link to these articles.

Archieve: Lists the article counts according to the year and the months. 

Categories:Lists category names and counts of articles in that category.

These there componets are unvisible at the width less than 740 pixels. These three components are used at the footer as well.

###main

In this part there is list of articles not exceeding five. All articles are collapsed with three lines of content are visible. 

Title of the article has a link to show article in a page alone. I used React-Router to make every single article has a distinguished link to make them reachable from search engines. Every article has a description key in the db. I used [react-helmet] to manipulate page title and description for SEO.

The article owner and the admin can see edit and delete links at the bottom of the article. 

I used [react-ckeditor-component] for adding and editing articles.

Below every article there is messages container. All logged in users can add messages. I used textarea for adding messages. Only the message owner and the admin can delete messages. All messages contains the corresponting articles id and listed accordingly.


###authentication
Authentication component have three  componets toggles between signIn, signUp and passwordReset forms.

Signup needs email verification. I used nodemailer which comes default by LoopBack. User can login only after email verification.  

I integrated a password resetform as well. User can change his/her password by token send to their email.



##License
MIT Copy Erdogan Cihan;