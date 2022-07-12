# Online Bus Reservation System
lorem 

### System Overview
<img src="public/about_me/system-overview.png" width="700"> <br/>

### Database Diagram
<img src="public/about_me/database-diagram.JPG" width="700"> <br/>

### Use Cases by User Role
<img src="public/about_me/use-cases.JPG" width="700"> <br/>

## User Interface
lorem

## E2E testing
lorem

## For Developers
### Installation
Step1: `$ git clone https://github.com/Senior-Project-OBRS/supreme-pancake.git`<br/> 
Step2: `$ meteor npm install --save`<br/> 

### Build
Step1: create settings.json in the root directory with the following parameters <br/>
Step2: `$ meteor run --settings settings.json`<br/>

![settings.json](/public/about_me/settings-file.JPG)

### Run Testing
- full-app tests `$ meteor test --full-app --driver-package meteortesting:mocha --port 3100`
- unit tests `$ meteor test --driver-package meteortesting:mocha --port 3100`

### Deploy
`$ meteor deploy nj-phuyaipu.meteorapp.com --free --mongo --settings settings.json`