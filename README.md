# Introduction

This project contains Cory Fitzpatricks answers to the Broad DSP Engineering Interview take-home questions. Documentation for this code was written in google docs.

Documentation Google Docs Link: https://docs.google.com/document/d/1zB4FtwN3OkYbEBosfaxE619eSWbEbAOZBw8Y5Y8yD3w/edit?usp=sharing

Documentation Github PDF Link: https://github.com/coryartfitz/broad-take-home/blob/main/docs/Broad%20DSP%20Engineering%20Interview%20Take-Home%20Documentation.pdf

# How to verify answers

To verify the answers in this project, you can simply open the file /app/index.html in your favorite browser. View the answers directly on the page or follow the instructions below to view them in the console.

1. Open the file /app/index.html in your favorite browser.
2. Right click anywhere on the page.
3. Select "Inspect" from the list of options.
4. Click "Console" in the list of tabs along the top of the web inspector
5. View the answers in the console output

# How to build the app and run tests

## Install the latest Node version

Note: You can skip this if you have node installed already or have a preferred way to do so (I'm pretty sure any version will do).

 1. Install NVM (Node Version Manager): https://github.com/nvm-sh/nvm

        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    
 2. Install the latest version of node

     Note: If your having trouble see: https://github.com/nvm-sh/nvm#usage
    
        // "node" is an alias for the latest version
        nvm install node 

3. Use the latest version of Node

        nvm use node

## Install dependencies and build the project

### Install dependencies 

    npm install

### Build The Project / Compile the JavaScript

This compiles all ES6 and combines all JavaScript into the file app/js/bundle.js

    npm run build

# How to run tests in terminal

    nmp run test