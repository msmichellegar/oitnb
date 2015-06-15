
# OITNB Spoiler Twitter

## What is this?

[![Build Status](https://travis-ci.org/jmnr/canary.png?branch=master)](https://travis-ci.org/jmnr/canary)
[![Code Climate](https://codeclimate.com/repos/556de8356956802d2500a1d3/badges/7f0d8ea976928c1f8e0b/gpa.svg)](https://codeclimate.com/github/jmnr/canary)
[![Test Coverage](https://codeclimate.com/repos/556de8356956802d2500a1d3/badges/7f0d8ea976928c1f8e0b/coverage.svg)](https://codeclimate.com/github/jmnr/canary/coverage)
[![Dependency Status](https://david-dm.org/jmnr/canary.svg)](https://david-dm.org/jmnr/canary)
[![devDependency Status](https://david-dm.org/jmnr/canary/dev-status.svg)](https://david-dm.org/jmnr/canary#info=devDependencies)

This is a twitter clone purpose-built for talking about Orange is the New Black with spoilers.

## Why?

Because we're good moral people who don't want to spoil the rest of the world.

## How is this built?

This project is forked from the [Canary twitter clone](http://canaryapp.herokuapp.com) built at Founders & Coders London. That project was built as an exercise in using Node.js on a large scale.

This is the process used to create that project:

- [x] Make Create, Read and Delete (CR-D) endpoints
- [x] Store tweets as JSON in memory (now obsolete, as we're using Redis)
- [x] Store Tweets in the file system
- [x] Use Cookies to restrict tweet deletion to the browser from which the tweet was originally created
- [x] Move Tweets to Redis
- [x] Deploy to Heroku
- [x] Add real-time updates of tweets with Socket.io
- [x] Hash tag functionality (for different programming languages)
- [x] Attach geolocation data to every clap
- [ ] Allow users to select their own location from a map
- [x] Display all claps on a map
- [x] Username functionality using cookies
- [ ] Like button (stretch goal)

##How can you run this project?

You will need to have node.js, nodemon and redis installed, plus a basic understanding of git and your terminal to get this working.

### 1. Clone the repo

```sh
git clone https://github.com/msmichellegar/oitnb.git
```

### 2. Install the node.js dependencies:

```sh
npm install
```

### 3. Run the Server with [Nodemon](https://github.com/remy/nodemon):

```sh
npm run nodemon
```
### 4. Go to localhost:8000 in your browser.
