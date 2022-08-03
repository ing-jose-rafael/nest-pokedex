<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    

## Ejecutar en desarrollo

- clonar el repositorio.
- Instalaciones.

```bash
# ejecutar
$ yarn install

# Tener Nest CLI instalado.
$ npm i @nestjs/cli
```

- Levantar la Base datos

```bash
# DB
$ docker-compose up -d 
```
- Reconstruir la DB

```bash
# realizar la peticion get a la ruta
http://localhost:3000/api/V2/seed
```
 

```bash
# watch mode
$ npm run start:dev
```

## Stack usuado
- MongoDB
- NestJS
## License

Nest is [MIT licensed](LICENSE).
