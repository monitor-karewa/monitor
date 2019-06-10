# Monitor Karewa Web

Bienvenido a Monitor Karewa Web

Este proyecto busca presentar información pública de contrataciones realiazadas por instituciones públicas, a través de
una plataforma accesible y de código abierto que puede ser usada por instituciones locales, estatales y nacionales en
México.

Nuestros principales objetivos son los siguientes:
- Código libre - Extender el alcance de la plataforma a través de un repositorio de código abierto y orientado a la comunidad.
- Replicabilidad - Permitir a cualquier institución pública tener su propia instancia, ofreciendo herramientas y guías en como hacerlo.
- Usabilidad - Empoderar a los ciudadanos con una plataforma accesible desde cualquier lugar, con un enfoque en la accesibilidad y experiencia de usuario.

 # Implementación rápida (sin configuración)

 Puedes crear una nueva instancia de Monitor Karewa en Heroku usando el siguiente botón. Recuerda antes [crear una cuenta gratuita en Heroku](https://signup.heroku.com/).

 [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/monitor-karewa/monitor)

 **NOTA**: Por limitaciones de Heroku, este servicio solo se encuentra disponible desde GitHub: https://github.com/monitor-karewa/monitor


## Plataforma

La plataforma usa las siguientes tecnologías:

- **Lenguajes**: Javascript, Pug (antes Jade), CSS, HTML
- **Platformas**: NodeJS, VueJS
- **Manejo de peticiones**: ExpressJS
- **Base de datos**: MongoDB
- **ODM**: Mongoose


Repositorio en GitLab: https://gitlab.com/karewa/monitor

Repositorio GitHub (mirror): https://github.com/monitor-karewa/monitor

Guía de usuario: https://gitlab.com/karewa/monitor/wikis/home


# Instalación (desarrollo)

Decargar el proyecto y ejecutar el siguiente comando para instalar las dependencias desde la carpeta raíz:

    `npm install`

## Servidor

Para correr el servidor:

    `npm start`

El servidor estará disponible en el puerto 3000 (por defecto).

Para correr el servidor en un puerto distinto:
    `PORT=3001 npm start`


La configuración del servidor está disponible en el archivo `/src/server/config/config.js`

## Cliente

Para correr el cliente:

    `npm run serve`

El cliente estará disponible en el puerto 8080 (por defecto).

La dirección de la API y otras variables de entorno se encuentran definidos en el archivo `.env.development`

## Compilación para producción

Compilar y minificar cliente para producción

    `npm run build`

Correr servidor en modo producción

    `NODE_ENV=production npm start`


## Generador de catálogos

Para instalar el generador de yeoman personalizado para generar catálogos base:

    npm link ./generators/generator-mkw

Para crear el catálogo:

    yo generator-mkw:catalog

Después introduce el nombre del catálogo y el generador creará los archivos base de modelo, controlador y rutas.
> **Nota**: Es necesario agregar las rutas a la configuración del servidor y personalizar el modelo

## Ejecución de pruebas

Para instalar el motor de testing e2e:

    `npm install -g nightwatch`

Ejecutar pruebas:

    `nightwatch`


# Guía de contribuciones

[Enlace a documentación](docs/contributionGuide.md)

# Despliegue y configuración del servidor para producción

[Enlace a documentación](docs/serverConfig.md)

# Configuración cuenta para envío de correos

La plataforma envía correos mediante la cuenta smtp configurada a través de las siguientes variables de entorno:

- `SMTP_USER`: Usuario para credenciales de SMTP
- `SMTP_PASS`: Contraseña para credenciales de SMTP
- `SMTP_ACCOUNT`: Cuenta con la cual se identificará la plataforma. Puede ser la dirección de correo electrónico en sí o seguir el formato `Monitor Karewa <monitorkarewa@gmail.com>` (por ejemplo).

Esta configuración es opcional, pero es requerida para enviar correctamente correos (ej. correo de configuración de contraseña).