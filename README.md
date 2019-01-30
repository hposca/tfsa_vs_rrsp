
<!-- vim-markdown-toc GFM -->

* [Requirements](#requirements)
* [Structure](#structure)
* [Running](#running)
    * [Preparations](#preparations)
    * [Using](#using)
* [Improvements](#improvements)

<!-- vim-markdown-toc -->

Implementation of a simple comparison between TFSA and RRSP.

# Requirements

- `docker`
- `docker-compose`

Recommended way of installing `docker-compose`:

```bash
sudo -H pip3 install --upgrade docker-compose
```

# Structure

```
+------------+        +-----+
| Web Server + <----> | API |
+------------+        +-----+
```

The `Web Server` and the `API` are two distinct applications, each one with its own docker container.
The Web Server provides the frontend of our application. And the API is the one responsible for executing all calculations.
A `POST` from the frontend is sent to the `API` which, calculates and then sends the result back.

# Running

## Preparations

To start all the services:

```bash
make
```

with this, the Web Server and the API containers will start.

## Using

One can use a browser, pointing into `http://localhost:8080/` or directly execute `POST`s into `http://localhost:5000/`.

An example of directly executing `POSTs` is the `integration_tests/api_tests_curl.sh` bash script.

# Improvements

- On the frontend side our JQuery is very naive
    - It doesn't validate the inputs, except if they are blank
    - The generation of the table of results could be done somewhere else and not directly on the succes function
    - We are not truncating the values that we receive from the API
- Right now we only have a single Web Server, we could increase this amount by using a load balancer
- There is no centralized logging system nor performance monitoring
- We could improve the quality of our code by creating some unit tests for the backend calculations
