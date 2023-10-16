# Mock Data Dashboard
 * [Project Description](#project-description)
 * [Project Architecture](#project-architecture)
 * [MERN Stack Diagram](#mern-stack-diagram)
 * [Features](#features)
 * [Installation and Usage](#installation-and-usage)
 * [Contributors](#contributors)


## Project Description
This project is a self-exploration of JavaScript with a focus on a final project doing simple data visualization from a sample of mock data. I taught myself JS from scratch (just about) for this project and utilized a framework and previous simple web development skills in html/css. The project is also supported by a backend hosted on AWS and a MongoDB database that stores the data.

## Project Architecture
- ReactJS frontend, hosted on Vercel [here](https://reactjs-chartjs-material-ui-frontend-app.vercel.app/)
- Supported features and styling using ChartJS, MaterialUI, CSS stylesheets, and credentials for AWS service layer endpoint
- A service layer with NodeJS and ExpressJS that connects to the data layer (database)
- Service layer maintained on AWS Apprunner with "basic-user" credentials for database access
- MongoDB database with mock data that includes multiple series for data visualization
- Admin and user roles for access; user role is read-only for all tables
- All layers are hosted/deployed independently of each other

## MERN Stack Diagram
<img alt="MERN Stack" src="MERN-Architecture.png" width="60%" title="MERN Stack">

## Features
- Bar, pie, and doughnut charts for data series in a carousel view
- Loading screen (just a "p" tag but prevents errors) while waiting async data fetch
- Dropdown menu for choice of data series
- Responsive charts and "analytics" for respectives series
- Dynamic styling compatible for sizes ranging from computer to phones
- In-depth pop-up legend, sorted by y-values, with progress bars to better visualize difference in data (click "See Legend")

## Installation and Usage

To install and run this project locally, start by cloning the project (or forking):
```
git clone https://github.com/wyatt-combs-11/reactjs-chartjs-material-ui-frontend-app.git
```

Once the project is downloaded, the necessary modules need to be installed:
```
npm install
```

To run the project after it is set up:
```
npm start
```
> Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

To run tests for the project (not created yet):

```
npm test
```
> Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Contributors
- Wyatt Combs
