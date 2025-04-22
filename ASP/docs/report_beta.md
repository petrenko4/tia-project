# Project Info:
- Name and Surname: Dmytro Petrenko
- Project Title: ASP
- Repository Link: https://github.com/petrenko4/tia-project.git
- Public Project Instance Link: https://nottify-c31l.onrender.com

# Reported Version Info:
- Tag: beta <!-- State the tag, e.g., beta_subversionNumber, if changes were made before the submission deadline -->

# Testing Info:
<!-- Provide credentials for test users if needed for testing your beta version. Also include any other relevant information for testing. You may alternatively send this information via email with your beta submission (e.g., if you don’t want to share test credentials publicly). -->
- No test credentials are needed — the website includes a Sign Up feature, so testers can create their own accounts and generate testing data independently.

# How to Set Up the Development Environment
<!-- Steps to run the development environment locally (use Docker/Docker Compose if you’re comfortable with it) -->
- Follow the same steps used in class, including installing the necessary dependencies, setting up the database, and running the frontend and backend servers.

# Implementation Status:
<!-- List in bullet points which functionalities are already implemented, in progress, or not implemented at all -->
- Creating releases – fully implemented.
- Uploading tracks and linking them to releases – fully implemented.
- User authentication and login/logout – implemented and working.
- Playlists – planned, will be implemented before the final version.
- Browsing and filtering content – to be implemented.
- Admin features – to be added in the final version.

# Timeline:
<!-- Updated timeline for the remaining period until the final version submission -->
- Playlists implementation
- Browsing and admin features

# Issues:
<!-- Describe any problems you encountered. If there were none, explicitly state that. -->
- The core functionality works, but the UI still needs design improvements to make it look more appealing. :)
- For deployment, I had to change the way of storing uploaded files by configuring the application to upload them to Amazon S3 instead of storing them locally.