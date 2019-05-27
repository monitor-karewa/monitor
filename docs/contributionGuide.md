# Guía de contribuciones


El proyecto fue cuidadosamente elaborado para facilitar la adición y modificación de código para su mejoramiento. Cualquiera puede contribuir a la plataforma con mejoras, funcionalidades, y correcciones. Para apoyar el crecimiento de la plataforma, se incluye una guía de contribuciones junto con el código fuente:

Se detalla a continuación la estructura general de la aplicación con respecto a su código fuente.

## Servidor de aplicación

Con dirección en “/src/server”,  esta carpeta contiene la lógica necesaria para que el servidor de la plataforma pueda manejar todas las solicitudes del cliente.
Se divide en 8 directorios importantes:

**Components**

Son todas las utilidades y herramientas definidas por los desarrolladores que ayudan al sistema a llevar a cabo tareas que son de utilidad en varias secciones del código del servidor.

**Config**

Contiene los archivos de configuración y variables fijas del sistema que le definen su manera de trabajar en el entorno de producción, tales como la información de la base de datos, los puertos de conexión, así como las credenciales de acceso al servicio de correo electrónico con el cual la plataforma se encarga de mandar mensajes a los usuarios y recibirlos.

**Controllers**

Manejan la lógica que se encarga de las peticiones del cliente, recibiendo la información, procesándola de acuerdo a la solicitud y respondiendo con los datos necesarios.

**Locales**

Localización de los archivos de internacionalización por parte del servidor. Su función es mostrar con el lenguaje correcto el texto que se le muestra al usuario para pueda navegar a través de la plataforma.

**Models**

Los modelos son una parte fundamental para mantener la integridad de los datos en la base de datos. Estos establecen las reglas de qué y cómo se guardarán los documentos que componen toda la información de la plataforma.Public

En este directorio se guardan los archivos misceláneos que son de utilidad en situaciones específicas. Un ejemplo son los archivos fijos o plantillas que el usuario descarga para su uso dentro de la plataforma.

**Routes**

Las rutas definen los caminos a seguir de cada una de las peticiones que se realizan al servidor dirigiendo al controlador correspondiente que dará la respuesta al cliente.


## Cliente

El cliente es aquella parte de la aplicación que se comunica con el usuario, proporcionando herramientas para que este pueda solicitar y ver la información de forma procesada y concisa así como su fácil manipulación utilizando elementos gráficos.

Al igual que el servidor se encuentra dentro de la carpeta “src” pero en este caso está dividido en diferentes directorios que contienen los distintos tipos de componentes necesarios para su funcionamiento. A continuación se explica de forma breve cada uno de los directorios.

**api**

Contiene los archivos que gestionan las diferentes rutas que deben ser llamadas para hacer peticiones al servidor dependiendo de la acción del usuario

**assets**

Guarda  toda la información con respecto a la estética de la página incluyendo colores, imágenes y fuentes.

**common**

Se utilizan para compartir pequeños fragmentos de código útiles dentro del código fuente del cliente

**mixins**

Inicializadores de funcionalidad que evitan la reescritura de código en componentes parcialmente equivalentes

**pages**

Aquí es donde se almacenan los componentes que contienen el código HTML que se le muestra al usuario. Su tamaño puede variar desde páginas completas hasta elementos simples como lo es un botón.

**plugins**

Aquí se concentra el código de terceros que se utilizan como herramientas de ayuda para el ágil desarrollo en plataformas web

**store**

Los archivos que componen el store conforman de una estructura que se utiliza para brindar y mostrar al usuario la información que está solicitando en este momento.


## Ramas 

Como se mencionó anteriormente, se utilizó una herramienta de control de versiones (Git) la cual administra todos los cambios y aportaciones realizados al código fuente. Una de sus funcionalidades es la posibilidad de tener diferentes ramas las cuales pueden tener diferentes variaciones del sistema antes de ser integradas a la rama principal, sobre la cual se ejecuta la aplicación en el ambiente de producción.
La ramas más importantes son:

**dev** 

La rama base a nivel desarrollo donde se integran todos los cambios nuevos de las demás ramas que parten de ella y a donde se hacen todas las colaboraciones de características nuevas a la plataforma.

**master**

Es la rama principal y más importante puesto que  sobre esta se ejecuta la aplicación por lo cual solo se integran funcionalidades nuevas de la plataforma desde la rama dev.
En caso de tener una incidencia que deba ser corregida de forma inmediata es recomendado crear una nueva rama a partir de master, corregir el error y mezclar los cambios sin pasar por la rama dev.

Nota: Ambas ramas están protegidas para que los desarrolladores no puedan realizar cambios directamente sobre ellas y utilicen el protocolo como es debido.

## Cliente y servidor

El proyecto se conforma de dos partes principales: el cliente y el servidor.

Estas partes presentan variaciones en el entorno de desarrollo y de producción.

En entorno de desarrollo, el cliente y el servidor se ejecutan como procesos distintos, para permitir el hot-reloading (actualización automática después de hacer cambios).
 
Ambos se configuran con:

`npm install`

En algunas situaciones, es necesario también instalar `supervisor`.

`npm install -g supervisor`

Para correr el cliente:

`npm run serve`

Para correr el servidor:

`npm start`

Para agregar una funcionalidad, se requiere tomar en cuenta distintos componentes y dónde se van a localizar.

### Cliente

Al agregar una funcionalidad del cliente, se deben agregar los siguientes:

- **Page Vue Component**: una nueva "página" se debe agregar como un nuevo componente de Vue en el directorio de `/src/pages`.
- **Vue Components**: los componentes usados en la página, se deben agregar como componentes de Vue en el directorio de `/src/components`.
- **Route**: ruta en la configuración de `vue-router`, disponible en `/src/router.js`.
- **Store** (optional): flux-based store con `vuex`; se debe agregar un nuevo módulo del store en un archivo con terminación `*.store.js` al directorio `/src/store/modules/`, y después configurarlo a `/src/store/index.js`.
- **Api** (optional): archivo centralizado con la funcionalidad de comunicación hacia la API (servidor); se debe agregar un nuevo archivo con terminación `*.api.js` al directorio `/src/api/`. 

### Servidor

- **Controller**: un nuevo controlador, con la lógica de manejo de cada ruta del servidor, se debe agregar en un archivo con terminación `*.controller.js` al directorio `/src/server/controllers/`.
- **Model**: un nuevo modelo con la estructura de base de datos; se debe agregar en un archivo con terminación `*.model.js` al directorio `/src/server/models/`.
- **Route**: la configuración de rutas se debe agregar con un archivo con terminación `*.routes.js` al directorio `/src/server/routes/`.
