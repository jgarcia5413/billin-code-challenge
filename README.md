# Billin code challenge 2021 edition

Welcome to the **Billin code challenge 2021 edition**. We look forward to to seeing what you come up with!!

Please find below the _instructions_ and the _key points_ for doing the exercise.

# Instructions

The challenge explanation is very simple, you have to develop an invoice importer. As such you'll find a test file called `importer.test.ts`. The goal is to get the tests running in green :). And that's all.

We have gien you with the two CSV files you will need to get the tests running in. Please see the `files` folder.

In the section **Tests** you will find the instructions to run the tests.

As you can see, the code files are in **Typescript**. If you never have programmed in this language, this is a great opportunity to start. Hey, remember that it is just Javascript.

Otherwise, you are free to approach the challenge in any way you wish. The only hint we will give you is that the code should be **extensible** and **maintainable**. We highly value code **readability**, so please pay close attention to this.

# Tests

- Single run testing
  `npm test`
- Development testing mode (watch all files or a single file)
  `npm run test:watch`

# Development

I've tried to use a clean architecture (using ports and adapters pattern) and SOLID principes. In addition, we have tried to test all the functionalities using TDD to develop some of them.

This project is structured as:

* **Domain**: Contains models and interfaces of services (ports)
* **Infrastructure**: Contains implementation of services interfaces on domain
* **UseCase**: Contains uses case of the application. This would be part of the application layer. In this layer also contains the importer.ts (has controller role).
  * **Utils**: Contains differents utilities for parse or validate invoice data

For some constants an **.env** file has been implemented. Before start copy .env.sample and rename to .env for use it