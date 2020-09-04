# express-eshop

## Getting started

### Prerequisites

- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Installation

Clone the repository:

`git clone https://github.com/hqrrylyu/express-eshop.git`

Provide environment variables:

`./envs/local/web.env` or `./envs/prod/web.env`

```
DEBUG=[true|false]
SECRET_KEY
DB_URI
```

`./envs/local/db.env` or `./envs/prod/db.env`

```
POSTGRES_PASSWORD
```

Run the stack:

`docker-compose up`

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
