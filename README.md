#sfotipy

El proyecto oficial del [curso de Frontend Profesional](http://mejorando.la/frontend)

Los archivos trabajados en las clases 1, 2 y 3 están en una nueva rama https://github.com/Sfotipy/sfotipy/tree/clases_123

Se libre de contribuir al proyecto terminando el resto del diseño de Sfotipy :)

## Instalación

### Grunt.js y Node.js

Para automatizar y agilizar el desarrollo frontend del proyecto, hemos instalado
[Grunt](http://gruntjs.com), que es un gestor de tareas que corre en JavaScript

Necesitas tener instalado [NodeJS](http://nodejs.org/downloads), ya que Grunt lo utiliza,
pero no hay que preocuparse, no es necesario saber Node.js para utilizarlo. Es igual
que Stylus, lo utiliza como motor por debajo.

Si tienes MAC, puedes instalar con `homebrew`:
```sh
# Instala Homebrew en tu equipo
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
# Instala Node con Brew
$ brew install node
```
### Dependencias globales
Una vez tenemos Node instalado, podemos instalar las siguientes dependencias
globalmente ya que las utilizaremos en este y otros proyectos
```
$ sudo npm install -g stylus
$ sudo npm install -g nib
$ sudo npm install -g grunt
$ sudo npm install -g grunt-cli
```

## Ejecución
Para arrancar el proyecto, primero necesitamos instalar las dependencias de
desarrollo que hemos definido en el `package.json` lo hacemos con
```
$ npm install
```
Entonces ya podemos correr el servidor y empezar a desarrollar el frontend e ir visualizando los cambios, lo hacemos con la tarea por defecto de `Grunt`
```
$ grunt
```
Esto nos abrirá por defecto una ventana del navegador en la URL [http://0.0.0.0:9000](http://0.0.0.0:9000) y gracias a `livereload` podemos ver los cambios son necesidad de recargar la
página
