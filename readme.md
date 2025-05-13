# 🎉 Funbase Modules 🚀

Este repositorio es un conjunto de herramientas diseñadas para facilitar el desarrollo de aplicaciones en Node.js mediante una estructura modular y fácil de usar. Funbase permite crear y gestionar módulos de manera eficiente, interactuar con bases de datos y manejar la configuración de aplicaciones.

El objetivo principal es ayudar a nuevos desarrolladores a crear APIs REST de forma rápida y sencilla, promoviendo una organización clara del código y la reutilización de componentes. Incluye ejemplos y documentación para aprender e implementar buenas prácticas en el desarrollo backend.

> ⚠️ **Nota:** Este proyecto no pretende ser un framework completo ni una solución para aplicaciones complejas. Fue creado como una herramienta introductoria para desarrolladores que, como yo en su momento, enfrentan el desafío de construir APIs REST sin experiencia previa. Espero que este repositorio sea útil como punto de partida en el mundo del backend.

---

## 📦 Módulos 

En el contexto de este paquete, los módulos son componentes reutilizables que encapsulan funcionalidades específicas y pueden ser utilizados en diferentes partes de una aplicación. Cada módulo tiene una estructura bien definida y un propósito claro, lo que facilita la organización del código, mejora la mantenibilidad y fomenta la colaboración entre desarrolladores.

### 📂 Estructura de los módulos:
- **`Model.js`**: 🗂️ Define la estructura de los datos y las operaciones relacionadas con la base de datos. Utiliza Sequelize para interactuar con la base de datos y define los modelos de datos, así como las relaciones entre ellos. También incluye métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los datos.

- **`Controller.js`**: 🧠 Contiene la lógica de negocio y maneja las solicitudes y respuestas HTTP. Se encarga de recibir las peticiones del cliente, procesar los datos utilizando los modelos y devolver las respuestas adecuadas. Los controladores actúan como intermediarios entre los modelos y las rutas.

- **`Route.js`**: 🌐 Define las rutas de la aplicación y asocia cada ruta con su respectivo controlador. Utiliza Express para gestionar las rutas y los métodos HTTP (GET, POST, PUT, DELETE). Las rutas son el punto de entrada para las solicitudes del cliente.

Con la finalidad de que puedas aprovechar `fb-modules`, he definido un template con estructura de carpetas que te permitirá organizar tu proyecto de manera eficiente. Puedes encontrarlo en este [enlace](https://github.com/Joregesosa/funbase-api-template). También encontrarás ejemplos y una explicación más clara de la estructura de carpetas.

---

## 🛠️ Crear un nuevo módulo
Para crear un nuevo módulo, puedes utilizar el siguiente comando en la terminal. Asegúrate de estar en la raíz de tu proyecto y de tener instalado el paquete `fb-modules`:

### ✨ Nuevo Módulo
```bash
npx fb make:module <nombre-del-modulo>
```
Esto creará una carpeta con el nombre del módulo dentro de la carpeta `modules` de tu proyecto. La estructura de carpetas del nuevo módulo será la siguiente:
```bash
modules
└── <nombre-del-modulo>
    ├── Model.js
    ├── Controller.js
    └── Route.js
```

---

### 📝 Crear archivos individuales
También puedes crear cada uno de los archivos por separado utilizando los siguientes comandos:

#### ➕ Nuevo Model
```bash
npx fb make:model <nombre-del-modulo>
```
Esto creará un archivo `Model.js` dentro de la carpeta del módulo.

#### ➕ Nuevo Controller
```bash
npx fb make:controller <nombre-del-modulo>
```
Esto creará un archivo `Controller.js` dentro de la carpeta del módulo.

#### ➕ Nuevo Route
```bash
npx fb make:route <nombre-del-modulo>
```
Esto creará un archivo `Route.js` dentro de la carpeta del módulo.

---

## 🗄️ Migraciones 

Sequelize es el ORM utilizado en este repositorio para interactuar con la base de datos. Permite definir modelos de datos y realizar migraciones para mantener la estructura de la base de datos actualizada.

Puedes correr las migraciones utilizando el siguiente comando:

```bash
npx fb db:migrate <nombre-del-modulo> --method
```
### Métodos disponibles:
- **`--up`**: Aplica las migraciones para crear o actualizar la estructura de la base de datos.
- **`--down`**: Revierte las migraciones aplicadas previamente.
- **`--refresh`**: Revierte y vuelve a aplicar las migraciones.

---

## 🤝 Contribuir
Si quieres contribuir al proyecto, puedes hacerlo de las siguientes maneras:
- 🐛 **Abrir un issue** si encuentras un error o tienes una sugerencia.
- ✨ **Abrir un pull request** si quieres agregar una nueva funcionalidad o mejorar la documentación.
- 📢 **Compartir el proyecto** con otros desarrolladores que puedan beneficiarse de él.

---

## 📜 Licencia
Este proyecto está licenciado bajo la [MIT License](LICENSE). ¡Siéntete libre de usarlo y adaptarlo a tus necesidades! 😊

---

¡Espero que este repositorio te ayude a crear tu API REST de manera rápida y sencilla! Si tienes alguna duda o sugerencia, no dudes en abrir un issue o un pull request. 🚀
