<a href="https://devlup-labs.github.io"><img src="https://img.shields.io/badge/Developed%20under-Winter%20of%20Code%2C%20DevlUp%20Labs-blue"/></a>

# SeekhoCTF

CTF Website for IIT Jodhpur

## Project Setup

Clone this repository by running the following command in your terminal/command prompt

`$ git clone https://github.com/Harshitgupta1023/website_ctf.git`

## Installing Dependencies

Now we need to install all the dependencies by running the following commands

`$ npm install --global yarn`

Add sudo before the command if you using any UNIX based system

`$ sudo npm install --global yarn`

If you don't have npm install either install Node Package Manager (NPM) from [here](https://nodejs.org/en/) or refer the [Official Yarn installation guide](https://classic.yarnpkg.com/en/docs/install/) for alternative methods.

Now run following commands

`$ cd server/ && yarn install`

`$ cd .. && cd client/ && yarn install`

At this stage the project is ready and we can start running it.

## Running the Website Locally

To start the server, cd into server and run

`$ yarn start`

Open any browser and open http://localhost:5000/graphql to access the GraphQL API

The server can now be accessed by our frontend or from any foriegn API

To start the website, open a new terminal instance and cd into client and run

`$ yarn start`

This will automatically open up the website in your default browser (Remember running the server is neccesary to run frontend)

## Contribution Guide

We are open to contribution. If you find any issues and want to contribute feel free to raise an issue or create a PR.

To contact us, email us on seekhoCTF@gmail.com
