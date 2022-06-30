# Taskinator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table-of-Contents

- [Description](#description)
- [Deployed Site](#deployed-site)
- [Features](#features)
- [Technologies](#technologies)
- [Future Development](#future-development)
- [Credits](#credits)

## Description

This is my third project for the University of Oregon Coding Bootcamp 2022. In this project, I build a task-tracker application named Taskinator that utilizes a Kanban Board user interface. This application utilizes JavaScript, local storage APIs, and DOM interfaces that allow users to interactively organize their personal to-do list. Tasks dynamically appear on the page as a user creates them. They remain persistent even after refreshing the page due to added localStorage capabilities.

## Deployed Site

Follow [this link](https://ashlynn4567.github.io/Taskinator/) to view and use our site!

## Features

This is how the main page appears to users. The page is responsive, adapting to multiple screen sizes.

<p align="center">
<img alt="A screenshot of the home page of Taskinator. There is a freeform text field near the top of the page, with a dropdown task-type list next to it. There is a submit button to the right of these two entry fields. In the main portion of the page, there are three columns - 'Tasks To Do', 'Tasks In Progress' and Tasks Completed'. These sections are where tasks are populated once the user creates them." src="./assets/images/taskinator-screenshot.jpg"/>
</p>

The user can use this application to track their tasks. The user can use the input box at the top of the page to type a task name, select a task type, and save it to their dashboard. The saved task automatically goes into the "Tasks to Do" column. There are also interactive buttons that dynamically appear on the task itself. The user can use these buttons to edit/update their tasks, or delete them from view.

<p align="center">
<img alt="A gif demonstrating a user adding a task to their kanban-style to-do list. Users can enter freeform text into a box and select a category for each task. By default, tasks appear in the 'Tasks To Do' section." src="./assets/images/taskinator-demo-1.gif"/>
</p>

If the user wishes to change the status of their task, they can use the dropdown list interactively to move each task to whatever column they want.

<p align="center">
<img alt="A gif demonstrating a user selecting different task types. When a different column type is assigned to a task, that task automatically moves to the newly assigned column." src="./assets/images/taskinator-demo-2.gif"/>
</p>

The tasks each user creates is saved in their local storage. This way, even if the user refreshes the page or returns to it at a later date, their tasks are saved.

<p align="center">
<img alt="A gif demonstrating that even after refreshing the page, tasks stay persistently on the page due to added localStorage capabilities." src="./assets/images/taskinator-demo-3.gif"/>
</p>

## Technologies

- HTML
- CSS
- JavaScript

## Future Development

In the future, I would like to add the following improvements:

- Task persistence should extend to which column the task is placed in upon refresh (currently if you refresh, all tasks move back to the "To Do" column).
- Adding the ability to further customize your task by color or other labels.
- Add ability to change the color theme of the page.
- Add ability to record dates or times to assign tasks to specific days. The user should only be able to see their tasks for the current day. The user should also have the ability to switch their view to a daily, weekly, or monthly task list. Tasks should only appear on their assigned time frame (i.e. April 14th task appears on april 14 in real time).

I'm always interested in refactoring code to improve it's functionality. If you would like to suggest your own improvements, you can reach our development team at the links below.

- <a href="mailto:ashlynn4567@gmail.com">Email</a>
- <a href="https://github.com/ashlynn4567">GitHub</a>
- <a href="https://www.linkedin.com/in/ashley-lynn-smith/">LinkedIn</a>

## Credits

This project was built with the help of the University of Oregon's Coding Boot Camp.

## Licensing

The application is covered under the following license: [MIT](https://opensource.org/licenses/MIT)
