var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  

var cssUglify = require('gulp-minify-css');

var babel = require("gulp-babel"); 


//var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var concat = require('gulp-concat'); //合并文件  
var imagemin = require('gulp-imagemin'); //图片压缩 
var Config = require('./gulpfile.config.js');

var runSequence = require('run-sequence'),   
    rev = require('gulp-rev'),    
    revCollector = require('gulp-rev-collector'); 
var cssUrl = './dist/chaohuo/src/css/*.css',
    jsUrl = './dist/chaohuo/src/js/*.js';
//======= gulp build 打包资源 ===============
function prod() {
    /** 
     * HTML处理 
     */
/*    gulp.task('html', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist));
    });*/
    /** 
     * assets文件夹下的所有文件处理 
     */
//  gulp.task('assets', function () {
//      return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
//  });
    /** 
     * CSS样式处理 
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src).pipe(cssUglify()) //执行压缩  
            .pipe(gulp.dest(Config.css.dist));
    });
    /** 
     * js处理 
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src)
        	.pipe(babel())
        	.pipe(uglify())
        	.pipe(gulp.dest(Config.js.dist));
    });

	gulp.task('revCss', function(){   
	    return gulp.src(cssUrl)        
			 .pipe(rev())        
	 		 .pipe(rev.manifest())        
			 .pipe(gulp.dest('dist/chaohuo/src/css'));
	});
	gulp.task('revJs', function(){    
	    return gulp.src(jsUrl)        
	         .pipe(rev())        
	 		 .pipe(rev.manifest())        
	 		 .pipe(gulp.dest('dist/chaohuo/src/js'));
	 });
	gulp.task('revHtml', function () {    
	    return gulp.src(['dist/chaohuo/src/css/**/*.json','dist/chaohuo/src/js/**/*.json', 'chaohuo/*.html'])  /*WEB-INF/views是本地html文件的路径，可自行配置*/        
	         .pipe(revCollector(
	         	{ replaceReved:true }
	         ))
	  		 .pipe(gulp.dest('dist/chaohuo'));  /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
	});


	gulp.task('dev', function (done) {   
		  condition = false;   
		  runSequence(       
		  ['revCss'],               
		  ['revJs'],               
		  ['revHtml'],               
		  done);});


/*    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(concat(Config.js.build_name)).pipe(gulp.dest(Config.js.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
    });*/
    /** 
     * 图片处理 
     */
/*    gulp.task('images', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        })).pipe(gulp.dest(Config.img.dist));
    });*/
    //gulp.task('build', ['html', 'css', 'js']);
    gulp.task('default', ['css','js','dev']);
    
}
module.exports = prod;