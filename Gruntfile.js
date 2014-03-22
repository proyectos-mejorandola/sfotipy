'use strict';

module.exports = function(grunt) {

    // Carga todos los plugins de Grunt que indicamos en `package.json`
    require('load-grunt-tasks')(grunt);

    // Tareas por defecto
    grunt.registerTask('default', ['connect:livereload','watch'])

    // Configuración de tareas
    grunt.initConfig({

    // Settings del proyecto (rutas configurables)
    sfotipy: {
        app: 'templates',
    },

    // Vigila los cambios que se efectuan en los archivos y ejecuta
    // las tareas asignadas
    watch: {
      // Esto nos permite que el navegador se recargue con cada cambio
      // que hagamos en el código. Todas las subtareas que incluyamos en
      // en la tarea `watch` ejecutarán livereload a menos que le indiquemos
      // lo contrario
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '<%= sfotipy.app %>/css/estilos.css',
                '<%= sfotipy.app %>/index.html',
                '<%= sfotipy.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        },
        styles: {
            files: ['<%= sfotipy.app %>/stylus/{,*/}*.styl'],
            tasks: ['stylus']
        }
    },

    // Automatiza el proceso de compilado de Stylus a CSS y su minificación
    stylus: {
        options: {
            use: [require('nib')]
        },
        compile: {
            options: {
                paths: ['<%= sfotipy.app %>/stylus/{,*/}*.styl'],
                'include css': true
            },
            files: {
                '<%= sfotipy.app %>/css/estilos.css': '<%= sfotipy.app %>/stylus/estilos.styl'
            }
        }
    },

    // Crea un servidor web de desarrollo para utilizar en local
    // La aplicación se muestra en http://localhost:9000 o http://0.0.0.0:9000
    // Podemos acceder desde otros dispositivos en nuestra red, por ejemplo
    // un celular o un tablet, simplemente ingresando en nuestros dispostivos
    // la URL del equipo en la red (ej: http://192.168.1.X:9000)
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      // Ejecuta la función livereload para poder ver los cambios del código
      // en el navegador en tiempo real
      livereload: {
        options: {
          open: true,
          base: ['<%= sfotipy.app %>/']
        }
      }
    }

  });

};
