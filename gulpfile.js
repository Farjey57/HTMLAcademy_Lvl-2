const gulp = require("gulp"); /* Все пакеты, используемые в автоматизации. Они ставятся из npm */
const plumber = require("gulp-plumber");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant')
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const pug = require('gulp-pug') 

/*
const svgstore = require("gulp-svgstore")
const webp = require('gulp-webp');
npm i gulp-webp 
gulp-svgstore для объединения иконок в спрайт
*/

// Styles
/*  главный файл scss, который выидит сборщик. Это уже собранный файл
 plumber() - отлавливает ошибки
 sourcemap.init() - показывает пути до файлов (из какого файла свойство)
 sass() - обрабатывается sass в css
 sync.stream() - локальная перезагрузка сервера
 */

 const markup = () => {
  return gulp.src("./src/pages/*.pug")
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
 }

 exports.markup = markup;

 /*Задача которая называется styles*/
const styles = () => {
  return gulp.src("./src/styles/index.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("index.min.css")) /*Переименовываем в min.css*/
    .pipe(sourcemap.write(".")) /*"."Путь куда сохранять*/
    .pipe(gulp.dest('./dist/'))
    .pipe(sync.stream());
}

exports.styles = styles;

/* Создание задачи для обработки фото */
const images = () => {
  return gulp.src("./src/img/*")
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest("./dist/images/"))
    .pipe(sync.stream());
}

exports.images = images;

/*
const webp = () => {
  return gulp.src("./src/img/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("./dist/images/"))
}

exports.webp = webp;
*/

/*const sprite = () => {
  return gulp.src("./src/img/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("./dist/images/"))
}

exports.sprite = sprite;*/

const fonts = () => {
  return gulp.src("./src/fonts/*")
    .pipe(gulp.dest("./dist/fonts/"))
    .pipe(sync.stream());
}

exports.fonts = fonts;

// Server
/*Сервер автоматически крутящийся*/

const server = () => {
  sync.init({
    server: {
      baseDir: './dist',
    },
    cors: true,
    notify: false, /*Отключает уведомления*/
    ui: false, /*Настройка сервера прямо в браузере*/
  });
}

exports.server = server;

// Watcher
/* Отслеживает группы файлов*/ 

const watcher = () => {
  gulp.watch("./src/**/*.pug", markup);
  gulp.watch("./src/**/*.scss", styles); /* что ищем в папке src на любом уровне вложенности с раширением scss. start- что сделать,если что-то изменилось в найденных файлах. В данном случае мы запускаем нашу сборку, набор инструкций */
  gulp.watch("./src/img/*", images);
  /*gulp.watch("./src/img/*.svg", sprite);*/
  gulp.watch("./src/fonts/*", fonts);
  gulp.watch("./dist/*.html").on("change", sync.reload);
}

/* запускает все по очереди если series. parallel - максимально параллельно */
const start = gulp.parallel(
  server, watcher
);

const build = gulp.series(
  markup, styles, images, fonts
);

module.exports = {
  start, build
};