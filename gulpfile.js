var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
//var runSequence = require('run-sequence');
//var babel = require('gulp-babel');

// 启动服务器并监控文件
gulp.task('default', function () {
    var watchJsList = [
        './webapps/components/**/*.js',
        './webapps/filters/**/*.js',
        './webapps/modals/**/*.js',
        './webapps/plugins/**/*.js',
        './webapps/views/**/*.js',
        './webapps/apis/**/*.js'
    ];

    function injectScriptToHtml() {
        var sources = gulp.src(watchJsList, {read: false});
        return gulp.src('./webapps/index.dev.html')
            .pipe($.inject(sources, {
                starttag: '<!-- inject:vue -->',
                transform: function (filepath) {
                    filepath = filepath.substring(9);
                    return `<script src="${filepath}"></script>`
                }
            }))
            .pipe($.rename("index.html"))
            .pipe(gulp.dest('./webapps/'));
    }

    // 添加删除js文件,会重新生成index文件
    $.watch(watchJsList, {
        read: false,
        events: ['add', 'unlink']
    }, injectScriptToHtml);

    // 或者编辑index.dev.html也会重新生成index文件
    $.watch(['./webapps/index.dev.html'], {
        read: false,
        events: ['change']
    }, injectScriptToHtml);

    console.log('make index.html');
    injectScriptToHtml()

    var watchTplList = [
        './webapps/components/**/*.html',
        './webapps/modals/**/*.html',
        './webapps/views/**/*.html'
    ]

    // 生成template
    function makeTplToJs(file) {
        var filePath = file.history[0];
        var fileBasePath = file.cwd;
        var tplRelativePath = filePath.substring(fileBasePath.length + 9)
        var dest = './webapps/templates/' + tplName
        debugger
        console.log(tplName)
    }

    $.watch(watchTplList, {
        events: ['add', 'unlink']
    }, makeTplToJs)
    // 或者编辑index.dev.html也会重新生成index文件
    $.watch(watchTplList, {
        events: ['change']
    }, makeTplToJs)


});

gulp.task('build', function (callback) {
    // runSequence(callback)
});

