<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Ejecutar en desarrollo

1. Clonar el repositorio.
2. Instalaciones.

```bash
# ejecutar
$ yarn install

# Tener Nest CLI instalado.
$ npm i @nestjs/cli
```

3. Levantar la Base datos

```bash
# DB
$ docker-compose up -d
```

4. Clonar el archivo **.env.template** y renombar la copia **.env**
5. LLenar las variables de entorno definidas en el **.env**
6. Ejecutar la aplicación en dev:

```bash
# watch mode
$ yarn start:dev
```

7. Reconstruir la DB

```bash
# realizar la peticion get a la ruta
http://localhost:3000/api/V2/seed
```

## Stack usuado

- MongoDB
- NestJS

# Production Build

1.  crear el archivo `.env.prod`
2.  Llenar las variables de entorno de prod
3.  Crear la nueva imagen

```bash
# creando la nueva imagen
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Notas

heroku redeploy sin cambios:

```bash
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku main
```

## License

Nest is [MIT licensed](LICENSE).
