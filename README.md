# Introduction

This project contains Cory Fitzpatricks answers to the Broad take-home interview questions.

# How to verify answers

To verify the answers in this project, you can simply open the file /app/index.html and follow the instructions the page displays or folllow the steps below.

1. Open the file /app/index.html in your favorite browsers.
2. Right click anywhere on the page.
3. Select "Inspect" from the list of options.
4. Click "Console" in the lsit of tabs along the top of the web inspector
5. View the answers in the console output

# How to build the app and run tests

## Install the latest Node version

Note: You can skip this if you have node installed already or have a perferd way to do so (I'm pretty sure any version will do).

 1. Install NVM (Node Version Manager): https://github.com/nvm-sh/nvm

        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    
 2. Get latest version of node

     Note: If your having trouble see: https://github.com/nvm-sh/nvm#usage
    
        # "node" is an alias for the latest version
        nvm install node 

3. Use the latest version of Node

        nvm use node

## Install dependencies and build the project

 ### Install dependencies 

    npm install

### Build The Project / Compile the JavaScript

    npm run build

# How to run tests

    nmp run test