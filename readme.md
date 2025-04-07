# Funbase Modules
 
Este repositorio es un conjunto de herramientas diseñadas para facilitar el desarrollo de aplicaciones en Node.js mediante una estructura modular y fácil de usar. Funbase permite crear y gestionar módulos de manera eficiente, interactuar con bases de datos y manejar la configuración de aplicaciones.

El objetivo principal es ayudar a nuevos desarrolladores a crear APIs REST de forma rápida y sencilla, promoviendo una organización clara del código y la reutilización de componentes. Incluye ejemplos y documentación para aprender e implementar buenas prácticas en el desarrollo backend.

Este proyecto no pretende ser un framework completo ni una solución para aplicaciones complejas. Fue creado como una herramienta introductoria para desarrolladores que, como yo en su momento, enfrentan el desafío de construir APIs REST sin experiencia previa. Espero que este repositorio sea útil como punto de partida en el mundo del backend.

## Modulos 

<!-- contine Model.js, Controlle.js, Route.js  -->

En el contexto de este repositorio, los módulos son componentes reutilizables que encapsulan funcionalidades específicas y pueden ser utilizados en diferentes partes de una aplicación. Cada módulo tiene su propia estructura y propósito, lo que facilita la organización del código y la colaboración entre desarrolladores.

Los modulos contienen tres archivos principales:
- **Model.js**: Define la estructura de los datos y las operaciones relacionadas con la base de datos. Utiliza sequelize para interactuar con la base de datos y define los modelos de datos, así como las relaciones entre ellos. También incluye métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los datos.

- **Controller.js**: Contiene la lógica de negocio y maneja las solicitudes y respuestas HTTP. Se encarga de recibir las peticiones del cliente, procesar los datos utilizando los modelos y devolver las respuestas adecuadas. Los controladores actúan como intermediarios entre los modelos y las rutas, asegurando que la lógica de la aplicación esté separada de la gestión de las rutas.

- **Route.js**: Define las rutas de la aplicación y asocia cada ruta con su respectivo controlador. Utiliza express para gestionar las rutas y los métodos HTTP (GET, POST, PUT, DELETE). Las rutas son el punto de entrada para las solicitudes del cliente y dirigen esas solicitudes a los controladores correspondientes.

Con la finalidad de que puedas aprovechar fb-modules he definido un template con estructura de carpetas que te permitirá organizar tu proyecto de manera eficiente. puedes encontrarlo en este [enlace](https://github.com/Joregesosa/funbase-api-template). Tambien puedras econtrar ejemplos y una explicacion mas clara de la estructura de carpetas.

## Crea nuevo Modulo
Para crear un nuevo módulo, puedes utilizar el siguiente comando en la terminal. Asegúrate de estar en la raíz de tu proyecto y de tener instalado el paquete `fb-modules`:

### Nuevo Modulo
```bash 
npx fb make:module <nombre-del-modulo>
```
Esto creara una carpeta con el nombre del modulo dentro la carpeta `modules` de tu proyecto. La estructura de carpetas del nuevo modulo sera la siguiente:
```bash
modules
└── <nombre-del-modulo>
    ├── Model.js
    ├── Controller.js
    └── Route.js
```

tambien puedes crear cada uno de los archivos por separado utilizando los siguientes comandos:
### Nuevo Model
```bash
npx fb make:model <nombre-del-modulo>
```
Esto creara un archivo `Model.js` dentro de la carpeta del modulo. La estructura de carpetas del nuevo modulo sera la siguiente:
```bash
modules
└── <nombre-del-modulo>
    └── Model.js 
```

### Nuevo Controller
```bash
npx fb make:controller <nombre-del-modulo>
```
Esto creara un archivo `Controller.js` dentro de la carpeta del modulo. La estructura de carpetas del nuevo modulo sera la siguiente:
```bash
modules
└── <nombre-del-modulo>
    └── Controller.js 
```
La estructura de archivo controller puede cambiar dependiendo si existe un archivo `Model.js` dentro del modulo.

### Nuevo Route
```bash
npx fb make:route <nombre-del-modulo>
```
Esto creara un archivo `Route.js` dentro de la carpeta del modulo. La estructura de carpetas del nuevo modulo sera la siguiente:
```bash
modules
└── <nombre-del-modulo>
    └── Route.js 
```
La estructura de archivo route puede cambiar dependiendo si existe un archivo `Controller.js` dentro del modulo.

### Migraciones 

Sequelize es el ORM utilizado en este repositorio para interactuar con la base de datos. Permite definir modelos de datos y realizar migraciones para mantener la estructura de la base de datos actualizada. Las migraciones son archivos que describen los cambios en la estructura de la base de datos y permiten aplicar esos cambios de manera controlada.

Ya que el sequelize utiliza los modelos como migraciones, no es necesario crear migraciones por separado. Al crear un nuevo modelo, se generará automáticamente una migración correspondiente y se registrara dentro de la carpeta `src/database/migrations/migrations.js`.  

Puedes correr las migraciones utilizando el siguiente comando:

```bash
npx fb db:migrate <nombre-del-modulo> --method
```
Este comando permite ejecutar las migraciones asociadas a un módulo específico. El parámetro `--method` define la acción a realizar:

- **--up**: Aplica las migraciones para crear o actualizar la estructura de la base de datos.
- **--down**: Revierte las migraciones aplicadas previamente.
- **--refresh**: Revierte y vuelve a aplicar las migraciones, útil para reiniciar el estado de la base de datos.

En caso de que no se especifique el método, se aplicara el metodo `--up` por defecto.
    
```bash
npx fb db:migrate <nombre-del-modulo>
```
En caso de que no se especifique el nombre del modulo, se aplicaran todas las migraciones de todos los modulos.

```bash
npx fb db:migrate
```

Asegúrate de que el módulo tenga un modelo definido para que las migraciones funcionen correctamente.

Es importante mencionar que los modulos deben ser creados en un orden adecuado, ya que si un modulo depende de otro, el modulo dependiente debe ser creado primero. Por ejemplo, si tienes un modulo `User` que depende de un modulo `Role`, debes crear primero el modulo `Role` y luego el modulo `User`. Esto es importante para evitar errores al momento de crear las migraciones y al momento de crear los modulos.

No hay mucho mas que agregar, espero que este repositorio te ayude a crear tu API REST de manera rapida y sencilla. Si tienes alguna duda o sugerencia, no dudes en abrir un issue o un pull request.

Si quieres contribuir al proyecto, puedes hacerlo de las siguientes maneras:
- Abriendo un issue si encuentras un error o tienes una sugerencia.
- Abriendo un pull request si quieres agregar una nueva funcionalidad o mejorar la documentacion.
- Compartiendo el proyecto con otros desarrolladores que puedan beneficiarse de él.

