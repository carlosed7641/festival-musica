const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemap = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//Función que compila SASS
function css() {
   return src('src/scss/app.scss') //Principal
    .pipe(sourcemap.init()) 
    .pipe(sass()) //Principal
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemap.write('.'))
    .pipe(dest('./build/css')) //Principal
}

function minificarcss() {
    return src('src/scss/app.scss')
     .pipe(sass({
         outputStyle: 'compressed'
     }))
     .pipe(dest('./build/css'))
 }

 function ordenarcss() {
    return src('src/scss/app.scss')
     .pipe(sass({
         outputStyle: 'expanded'
     }))
     .pipe(dest('./build/css'))
 }

 function javascript() {
     return src('src/js/**/*.js')
     .pipe(concat('bundle.js'))
 //    .pipe(terser())
 //    .pipe(sourcemap.write('.'))
//     .pipe(rename({sufix: '.min'}))
     .pipe(dest('./build/js'))
 }

 function imagenes () {
     return src('src/img/**/*')
     .pipe(imagemin())
     .pipe(dest('./build/img'))
     .pipe(notify({message: 'Imagen Minificada'}))
 }


 function versionWebp () {
     return src('src/img/**/*')
     .pipe(webp())
     .pipe(dest('./build/img'))
     .pipe(notify({message: 'Versión webP lista'}))

 }

 function watchArchivos() {
     watch('src/scss/**/*.scss', css); 
     watch('src/js/**/*.js', javascript);
 }

exports.css = css;
exports.minificarcss = minificarcss;
exports.ordenarcss = ordenarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.versionWebp = versionWebp;

exports.default = series(css, javascript, watchArchivos); //Ejecutar todas o algunas























// function hola( done ) {
//     console.log('hola mundo');

//     done();
// }

// function adios( done ) {
//     console.log('adios');
//     done();
// }

// exports.compilar = hola;
// exports.default = series(hola, adios); //Series para compilar varias funciones secuencialmente
// exports.default = parallel(hola, adios); //Parallel para compilar varias funciones segun vayan finalizando


