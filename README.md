# comic-tracker

WIP/Toy project to track comic collection/read status using
[ComicVine](https://comicvine.gamespot.com) APIs

## Project Status

This repo is set up to contain exploratory work for personal for my personal
enjoyment and learning. You are welcome to do _whatever you want_ with any of
the code here, but be aware that I am not currently publicly supporting this
project.

Until further notice, this repo may be deleted at any time.

## Development

### Prerequisites

* [Node](https://nodejs.org/en/) v8.x or later
* [Yarn](https://yarnpkg.com) v1.x or later ([installation](https://yarnpkg.com/en/docs/install))

### Dev Server

Run the development server using `yarn start`, which will open your browser tot http://localhost:3000

## To Do

* Component snapshot unit testing
* Implement database
* Read comics to local database from ComicVine
* GraphQL api for client to read from database
* User accounts
* Allow users to mark comics as read
* Allow users to mark comics as owned (and in what format)
* Allow users to tag comics
* Import/export comic read/owned/tags
* Integration tests
* Restore dev server `--host`, `--port`, and `--open` arguments
