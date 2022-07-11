# Installation
Step1: `$ git clone https://github.com/Senior-Project-OBRS/supreme-pancake.git`<br/> 
Step2: `$ meteor npm install --save`<br/> 

# Commit and push changes to Git repository
Step1: if you add file `$ git add -A`<br/> 
Step2: `$ git commit -m "comment something"`<br/> 
Step3: `$ git push`<br/> 

# Usage
`$ meteor run --settings settings.json`

# Run Testing
- full-app tests `$ meteor test --full-app --driver-package meteortesting:mocha --port 3100`
- unit tests `$ meteor test --driver-package meteortesting:mocha --port 3100`

# Deploy
`$ meteor deploy nj-phuyaipu.meteorapp.com --free --mongo --settings settings.json`

## DON'T FORGET TO DO THIS ON PRODUCTION
1) [Deploy database on cloud.mongo.com](https://medium.com/@cfnelson/mongodb-atlas-with-meteor-a-step-by-step-guide-da34093665f4)

## Things To Should Do
1. [Folder structure](https://guide.meteor.com/structure.html#example-app-structure)
2. [How to Write Better Git Commit Messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages) 
- feat – a new feature is introduced with the changes
- fix – a bug fix has occurred
- chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- refactor – refactored code that neither fixes a bug nor adds a feature
- docs – updates to documentation such as a the README or other markdown files
- style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- test – including new or correcting previous tests
- perf – performance improvements
- ci – continuous integration related
- build – changes that affect the build system or external dependencies
- revert – reverts a previous commit

## Reference from Related Project
- [Flight Management System](https://github.com/sanchit2107/Flight-Management-System)
- [AWS Serverless Airline Booking](https://github.com/aws-samples/aws-serverless-airline-booking)

##### Basic writing and formatting syntax in README files on [GitHub](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md)

##### React courses
- [Thai](https://www.youtube.com/c/KarnYong/search?query=react)

##### CSS Framework
- react-bootstrap => bootstrap 5
  - [Build a Website with React, React-Bootstrap and React-Router](https://youtu.be/jgVkR5EKI68)
  - [Build a website with React, React-Bootstrap, React-Router and Styled-Components](https://youtu.be/tOK9l5uP06U)
  - [React + Bootstrap 5 - let'st build a real page](https://youtu.be/l2131Rok8XU)
  - [React Bootstrap Tutorial](https://youtu.be/8pKjULHzs0s)
  - [React Bootstrap - Creating a Sign In form using Bootstrap 5 and React](https://youtu.be/MKb7FSt74f8)

- react-admin => material-ui => highly customizable 
  - [React Admin Dashboard Tutorial | React Admin Panel Design Course for Beginners](https://youtu.be/aTPkos3LKi8)
  - [Build React Admin Dashboard with Multiple Themes | React Admin Panel CSS | ReactJS](https://youtu.be/q8cabjyUTVY)
- AdminLTE v3 => bootstrap 4
  - [ติดตั้งและใช้งาน AdminLTE ✨ Admin Dashboard Template สุดแจ่มยอดนิยม 💯](https://youtu.be/MVV0SJP5pVw)
  - [สอน ReactJS + AdminLTE v3 Integration Updated (2020)](https://youtu.be/_sgGLmSKIPQ)