# Chamber-of-Secrets
MY first MERN Stack project.

### Project: Dummy Social Media

### Technologies used

- **NodeJs** -      Evented I/O for the backend
- **Express** -     Fast node.js network app framework
- **MongoDB** -     NoSQL Database
- **React.js** -    Javascript llibrary to build user frameworks.
- **React BootStrap** -  React components based on Bootstrap, responsive web application for all screen sizes.
- **SendGrid** - Email service for sending verfication and forgot password e-mails to the users.


### Features:

- It is a Single Page Application.
- Website is be a place where we can view and vote posts, which are simple text paragraphs.
- Main page has a feed that has all created posts (whitelisted) in the latest first order.

- Users can sign up on the website, using emails, which are verified by sending a verification email.
- User can create, edit and delete their posts all at one place.
- Every logged in user can vote any post, it can either upvote or downvote any post but only one vote on each post.

- Website can also be viewed as a guest. A guest can create a post, but can't manage  or vote it.

- Admin: Admin account is like any other logged in user account with extra features.
  - Admin can blacklist/whitelist posts, and thus those posts are not visible in the feed.
  - Admin can blacklist/whitelist a user. All of the user’s posts will automatically get blacklisted/whitelisted.
  - The user gets notified via email that they have been blacklisted/whitelisted.
  - Backlisted users are allowed to view feed but not access other features.
  - Admin can add and remove on the website.
