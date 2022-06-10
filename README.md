<!-- This template was created following The Markdown Guide - https://www.markdownguide.org/ -->

<!-- If you are editing this README.md on VS Code, please highlight and replace the following keywords enclosed in backticks (``) using:
* MacOS: CMD + Shift + L
* Windows: CRTL + Shift + L

GitHub Username: `richardguarnieri`
GitHub Repository: `employee-tracker`
Your Name: `Richard Guarnieri`
Email: `richard.gm@outlook.com`
LinkedIn Username: `rguarnieri`
Twitter Username: `ric_guarnieri`
Project Title: `Employee Tracker`
Project Description: `View and Manage Departments, Roles, and Employees in your Company!`
-->

<!-- Please also update the following links -->
[logo]: ./img/logo.png
[application-image]: ./img/app-image.png

<div id="home"><div> 

<!-- Badges / Shields -->
<!-- These were created using https://shields.io/ - feel free to replace / create yours by modifying links below: -->

<div align="center">
    <a href="https://github.com/richardguarnieri/employee-tracker/graphs/contributors">
        <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/richardguarnieri/employee-tracker?style=for-the-badge">
    <a>
     <a href="https://github.com/richardguarnieri/employee-tracker/network/members">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/richardguarnieri/employee-tracker?style=for-the-badge">
    <a>
     <a href="https://github.com/richardguarnieri/employee-tracker/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/richardguarnieri/employee-tracker?style=for-the-badge">
    <a>
     <a href="https://github.com/richardguarnieri/employee-tracker/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/richardguarnieri/employee-tracker?style=for-the-badge">
    <a>
     <a href="https://github.com/richardguarnieri/employee-tracker/blob/main/LICENSE">
        <img alt="GitHub license" src="https://img.shields.io/github/license/richardguarnieri/employee-tracker?label=license&style=for-the-badge">
    <a>
     <a href="https://github.com/richardguarnieri/employee-tracker/commits/main">
        <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/richardguarnieri/employee-tracker?style=for-the-badge">
    <a>
    <a href="https://www.linkedin.com/in/rguarnieri/">
        <img alt="LinkedIn shield" src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555">
    <a>
</div>
<br>


<!-- Header -->

<div align="center">
    <a href="https://github.com/richardguarnieri/employee-tracker">
        <img src="./img/logo.png" alt="Logo" width="300" height="auto">
    </a>
    <h1 align="center">Employee Tracker</h1>
    <div>
        View and Manage Departments, Roles, and Employees in your Company!
        <br>
        <a href="https://github.com/richardguarnieri/employee-tracker">
            <strong>Explore Documentation</strong>
        </a>
        <br>
        <br>
        <a href="https://github.com/richardguarnieri/employee-tracker">View Demo</a>
        ·
        <a href="https://github.com/richardguarnieri/employee-tracker/issues">Report Bug / Request Feature</a>
    </div>
</div>
<br>


<!-- Table of Contents -->
## Table of Contents
* [The Project](#the-project)
    * [Technology Stack](#technology-stack)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [How to Use](#how-to-use)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Miscellaneous](#miscellaneous)
    * [User Story](#user-story)
    * [Acceptance Criteria](#acceptance-criteria)
<br>


<!-- The Project -->
## The Project

![Application Image][application-image]

**Employee Tracker** is a CLI (command-line interface) application to view and manage departments, roles, and employees. The application was built using Node.js with Inquirer, MySQL2 and console.table packages.

<p align="right"> - <a href="#home">Return to Home</a></p>

### Technology Stack
* [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
* [Node.js](https://nodejs.org/en/)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [console.table](https://www.npmjs.com/package/console.table)

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- Getting Started -->
## Getting Started
To get started you will need a couple of things - clear explanation of this below:

<p align="right"> - <a href="#home">Return to Home</a></p>

### Prerequisites
[Node.js](https://nodejs.org/en/) as we will need it to install [Inquirer](https://www.npmjs.com/package/inquirer), [MySQL2](https://www.npmjs.com/package/mysql2) and [console.table](https://www.npmjs.com/package/console.table) packages to run the application.

The application will run on the CLI (command-line interface), meaning this will be our only requirement.

<p align="right"> - <a href="#home">Return to Home</a></p>

### Installation
In order to get started, we must first install [Node.js](https://nodejs.org/en/) - on macOS I prefer to install it using the Homebrew package manager and on Windows using the Node.js homepage download section.

**On macOS:**
1. To install Homebrew on macOS, browse to [Homebrew's official website](https://brew.sh/) and copy the link displayed on the page on the macOS terminal. At the time of writing, this is the command: 
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Once Homebrew installation is complete, type the following command to install Node.js and NPM:
```shell
brew install node
```

3. Once the installation finishes, confirm that you successfully installed Node.js by checking its version:
```shell
node -v
```

**On Windows:**
1. In a web browser, navigate to https://nodejs.org/en/download/. Click the Windows Installer button to download the latest default version. At the time of writing, the latest LTS version is 16.15.0.

2. Execute the installer to install Node.js

3. Once the installation finishes, confirm that you successfully installed Node.js by checking its version:
```shell
node -v
```

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- How to Use -->
## How to Use
First, clone this repo via HTTPS in your local computer - feel free to use any storage destination / folder of your choosing. On macOS / Windows, open the CLI (Command Line Interface) and type the following command (ensure you are located in the exact directory where you want to clone the repo):

```shell
git clone https://github.com/richardguarnieri/employee-tracker.git
```
After the repo has sucessfully cloned, navigate to the repo using the cd (chage directory) command:

```shell
cd employee-tracker/
```
Once inside the employee-tracker directory, install the necessary node pacakges to run the application - in order to do so, pls type on the CLI the following command:

```shell
npm install
```

Above command will install [Inquirer](https://www.npmjs.com/package/inquirer), [MySQL2](https://www.npmjs.com/package/mysql2) and [console.table](https://www.npmjs.com/package/console.table) packages along all its dependencies in a newly generated folder within the employee-tracker directory called node_modules/

Once installation finishes, we are clear to execute the application. To do so, run the index.js file typing in the CLI the following command:

```shell
npm start
```

After execution, the program will show a welcome message, including brief instructions. Quickly after, you will be presented the following options to choose from:

```shell
View All Departments
View All Roles
View All Employees
Add Department
Add Role
Add Employee
Update Employee Role
Update Employee Manager
View Employees by Manager
View Employees by Department
Delete Department
Delete Role
Delete Employee
View Departments Salary Budget
Quit
```

Choosing any option runs an SQL query in the background, for example, when you choose to **"View All Departments"**, you are presented with a formatted table showing department names and department ids.

Some queries such as **"Update Employee Role"** requires additional inputs from the user - please ensure the you follow the workflow of the program.

Validations are in place to ensure you do not delete records accidentally. For example, if you decide to delete a department, the program will ask you to ensure you do not have roles or employees mapped to it first. To delete it, ensure you update / delete roles or employees mapped to that department first - you can do this on the options menu.

After selecting any option (except **Quit**), you will be taken back to the options menu.

Choose the **Quit** option to quit the program.

```md
![alt text](assets/images/screenshot.png)
```

_For more examples, please refer to the [Documentation][documentation-url]._

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- Contribuiting -->
## Contributing
Contributions are much welcomed! If you have suggestions to make this application better, please fork the repo and create a pull request. 

You can also open an issue [here][github-issues-url] and tag it with the **"enhancement"** label.

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- License -->
## License
This project is licensed under the terms of the MIT license. 

See `LICENSE` for more information.

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- Contact -->
## Contact
Richard Guarnieri: richard.gm@outlook.com · LinkedIn: [rguarnieri][linkedin-url] · Twitter: [@ric_guarnieri][twitter-url]

Application URL: [https://example.com/][application-url]

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- Miscellaneous -->
## Miscellaneous
### User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

<p align="right"> - <a href="#home">Return to Home</a></p>

### Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

<p align="right"> - <a href="#home">Return to Home</a></p>


<!-- References, Links and Images -->
<!-- Badges / Shields Styles -->
[github-contributors-shield]: https://img.shields.io/github/contributors/richardguarnieri/employee-tracker?style=for-the-badge
[github-forks-shield]: https://img.shields.io/github/forks/richardguarnieri/employee-tracker?style=for-the-badge
[github-stars-shield]: https://img.shields.io/github/stars/richardguarnieri/employee-tracker?style=for-the-badge
[github-issues-shield]: https://img.shields.io/github/issues/richardguarnieri/employee-tracker?style=for-the-badge
[github-license-shield]: https://img.shields.io/github/license/richardguarnieri/employee-tracker?style=for-the-badge
[github-last-commit-shield]: https://img.shields.io/github/last-commit/richardguarnieri/employee-tracker?style=for-the-badge
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

<!-- Badges / Shields URL -->
[github-contributors-url]: https://github.com/richardguarnieri/employee-tracker/graphs/contributors
[github-forks-url]: https://github.com/richardguarnieri/employee-tracker/network/members
[github-stars-url]: https://github.com/richardguarnieri/employee-tracker/stargazers
[github-issues-url]: https://github.com/richardguarnieri/employee-tracker/issues
[github-license-url]: https://github.com/richardguarnieri/employee-tracker/blob/main/LICENSE
[linkedin-url]: https://linkedin.com/in/rguarnieri

<!-- Non Badge / Shield Reference Links -->
[documentation-url]: https://github.com/richardguarnieri/employee-tracker
[twitter-url]: https://twitter.com/ric_guarnieri