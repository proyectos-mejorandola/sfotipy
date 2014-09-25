# SfotiJS

*Fork* basado en [Sfoti.py](http://mejorando.la/sfotipy), el proyecto oficial del
curso de [Frontend Profesional de Mejorando.la](http://mejorando.la/frontend), pero utilizando
tecnologías JavaScript desde el cliente al servidor.

## Tecnologías utilizadas
### Frontend
	- Framework JavaScript: **Angular.js**
	- Pre-procesador CSS: **Stylus**
	- Gestor de Tareas: **Gulp.js**
	- Gestión de dependencias: **Bower.js**

### Backend
	- Base de Datos: **MongoDB y Redis**
	- Lenguaje/Framework: **Node.js/Express**
	- Gestión de usuarios: **PassportJS**

### Producción
	- Servidor Web: **Nginx**
	- Sistema: **Ubuntu 14.04 LTS @ DigitalOcean**

## Estructura de ficheros y directorios
 - `/client` Contiene la webapp cliente, escrita en Angular.js
 - `/server` Contiene los archivos del backend, escritos en Node.js/Express
 - `Gulpfile.js` Gestión de tareas en Gulp.js
 - `package.json` Fichero de entrada de la aplicación y declaración de dependencias
 - `bower.json` Fichero con la declaración de dependencias del Frontend
 - `.bowerrc` Ubicación de las librerías del Frontend
 - `.gitignore` Archivos que no incluimos en nuestro sistema de control de versiones
 - `.jshintrc` Fichero que nos permite seguir una misma sintaxis en el código JavaScript
 - `.editorconfig` Utilidad para tener la misma configuración en cualquier editor de texto

## Licencia
**The MIT License**

Copyright (c) 2014 Carlos Azaustre <cazaustre@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
