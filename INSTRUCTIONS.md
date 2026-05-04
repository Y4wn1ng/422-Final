# App Dev Practices — Final Exam

**May 4th, 2026**

---

## Practical Instructions and Overview

### Exam Policies

- Place your name at the top of the exam booklet on the first page.

- You are allowed to use your own laptop or the lab computers.
  - You are **not** allowed to use any form of AI. Turn all AI-based VS Code extensions (or similar) off.
- No other electronics are allowed.
  - You may use your phone for MFA and then put it away.
- You are allowed to use the internet, minus AI, on this exam.

- A single-sided original handwritten or typed crib sheet is allowed. It must:
  - Have your name on it
  - Not have any photocopies / photos / screenshots / pictures
  - Be no more than 8.5" x 11" in size
  - Be legible without visual aids
  - Be turned in at the end of the period
- Resource sharing is not allowed. Use your own.

- You may write on the back of your crib sheet or anywhere else on this exam booklet.

---

## IMPORTANT

Violation of these policies may result in removal from the classroom and a grade of F. You may be referred to the administration for student academic integrity misconduct.

---

### Time Limit

2 hours and 30 minutes

### Starter Files

The files you will need are located in: **Assignments → Final Practical Exam → Final Exam.zip**

---

## Getting Started

1. Unzip the starter files and examine the project.
    - All code is in `./src`
    - There are no tests in `./test`
    - There are 3 CSV files in `./test_data`
    - There is an empty `README.md`

2. You will need **Node v22.15.0** installed.
    - It may be helpful to have Node Version Manager installed: https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

3. You are allowed to make any changes you feel are necessary to support your work.

---

## Create a Git Repo

1. On GitHub, using your git user, create a new repository named **422-Final**.

2. Using git on your local machine, add the GitHub origin and commit this project to your new repository.

3. Create a new branch named **Exam** and complete the remainder of the exam within that branch.

---

## Writing Unit Tests

1. Write unit tests for the following:

    - `service.js`
    - `watcher.js`
    - `parser.js`

    > **Note:** You can find the locations of the folders in the `config.json` file.

    > **Note:** Jest is included in the `npm` `package.json` file, but if you prefer to use a different library, that is fine.

2. These unit tests must:

    - Assert specific outputs and outcomes. E.g., when a CSV file with one row is parsed, a JSON file with the same row exists in JSON format.
    - Have one test per unit of work. E.g., don't test outputs of JSON files at the same time you are testing the movement of an inbound file to the processed directory.

---

## Packaging — Delivery

1. Create a Docker Compose file that uses a base image from Docker Hub of your choosing.

2. Map the inbound, outbound, and processed folders to local volumes so data can be passed between the container and host.

---

## Documentation

1. Add code comments throughout where you feel it's necessary, and to any new code you create.

2. Modify the `README.md` in the root of the project to include instructions and information about the project.

3. The README should contain instructions on:

    - What the app does and how to use it
    - Accepting `.csv` files in a specific format
    - Parsing and outputting `.json` files in a specific format
    - Which version of Node is necessary
    - Steps to build the project (make? install? compose? etc.)
    - Specific details / dependencies that are required
    - How to use the container
    - Anything else that is novel to your implementation that a new developer should know

4. Throughout the project, include appropriate `console.log`, `console.info`, `console.warn`, and `console.error` outputs. A **minimum of 5** are expected to be added.

    - You can find examples of use inside of the `exitHandler.js` file that adds "color" using RGB codes.

---

## How To Submit

### GitHub

- Your final exam code should be committed to your **Exam** branch.
- Create a Pull Request from **Exam** to **Main** within your repository.
  - Do **NOT** merge Exam into Main.

### MyCourses Dropbox

- Zip your entire final exam code and upload.
- No Tar, Rar, or other compressed files — upload a **zip** file only.
- Place the **URL** to your Pull Request in the comment section.

---

> ### ⚠️ Warning
> **DO NOT MODIFY ANY CODE AFTERWARDS IN GITHUB!**
