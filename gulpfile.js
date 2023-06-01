const gulp = require("gulp"); /* Все пакеты, используемые в автоматизации. Они ставятся из npm */
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();

// Styles
/*  главный файл scss, который выидит сборщик. Это уже собранный файл
 plumber() - отлавливает ошибки
 sourcemap.init() - показывает пути до файлов (из какого файла свойство)
 sass() - обрабатывается sass в css
 sync.stream() - локальная перезагрузка сервера*/

const styles = () => {
  return gulp.src("src/styles/index.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("src/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server
/*Сервер автоматически крутящийся*/

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'src'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher
/* Отслеживает группы файлов*/ 

const watcher = () => {
  gulp.watch("src/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("src/*.html").on("change", sync.reload);
}

/* запускает все по очереди */

exports.default = gulp.series(
  styles, server, watcher
);