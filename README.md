![Node Version](https://img.shields.io/badge/Node_version-18.19.1-green)

# TodoAppPractice

Simple and functional app for managing daily tasks.

- Each task is editable and deletable.
- When a task is marked as completed, it gets automatically strikethrough and moves below active tasks.
- Tasks can be reordered manually, and the order is persisted in the database (simulated with json server).
- Once completed, a task can only be deleted, not edited.

A feature to add longer notes to each task is currently in development.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Setup

Run `npm run server` for running backend (json server). Run `npm run start` for running frontend. Navigate to `http://localhost:4200/`.
