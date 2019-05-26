var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var through = require('through2');
//var runSequence = require('run-sequence');
//var babel = require('gulp-babel');

gulp.task('init:injectTpl', function (callback) {
    var watchTplList = [
        './webapps/components/**/*.html',
        './webapps/modals/**/*.html',
        './webapps/views/**/*.html'
    ]

    // 生成template
    function watchAndMakeTplToJs(file) {
        var filePath = file.history[0];
        var fileBasePath = file.cwd;
        var tplRelativePath = filePath.substring(fileBasePath.length + 9).replace(/\\/g, '/')
        var writePath = './webapps/templates/' + tplRelativePath.substring(0, tplRelativePath.length - 5) + '.js'
        var tempArr = writePath.split('/')
        tempArr.pop()
        var dirPath = tempArr.join('/')
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        var contents = file.contents.toString('utf8')
        // debugger
        fs.writeFileSync(writePath, `(function (templates) {
    templates['${tplRelativePath}'] = \`${contents}\`
})(dlut.templates)`)
        console.log('inject:', 'tpl', dirPath, './webapps/templates/' + writePath)
    }

    $.watch(watchTplList, {
        events: ['add']
    }, watchAndMakeTplToJs)
    $.watch(watchTplList, {
        events: ['unlink']
    }, function (file) {
        var filePath = file.history[0];
        var fileBasePath = file.cwd;
        var tplRelativePath = filePath.substring(fileBasePath.length + 9).replace(/\\/g, '/')
        var writePath = './webapps/templates/' + tplRelativePath.substring(0, tplRelativePath.length - 5) + '.js'
        if (fs.existsSync(writePath)) fs.unlinkSync(writePath)
    })
    // 或者编辑index.dev.html也会重新生成index文件
    $.watch(watchTplList, {
        events: ['change']
    }, watchAndMakeTplToJs)

    gulp.src(watchTplList)
        .pipe(through.obj(function (file, encode, cb) {
            watchAndMakeTplToJs(file)
            this.push(file)
            cb()
        }))
        .on('finish', () => callback())
})

gulp.task('init:injectJs', function (callback) {
    var watchJsList = [
        './webapps/templates/**/*.js',
        './webapps/components/**/*.js',
        './webapps/filters/**/*.js',
        './webapps/modals/**/*.js',
        './webapps/plugins/**/*.js',
        './webapps/views/**/*.js',
        './webapps/apis/**/*.js'
    ];

    function injectScriptToHtml(cb) {
        var sources = gulp.src(watchJsList, {read: false});
        return gulp.src('./webapps/index.dev.html')
            .pipe($.inject(sources, {
                starttag: '<!-- inject:vue -->',
                transform: function (filepath) {
                    filepath = filepath.substring(9);
                    console.log('inject:', 'js', filepath)
                    return `<script src="${filepath}"></script>`
                }
            }))
            .pipe($.rename("index.html"))
            .pipe(gulp.dest('./webapps/'))
            .on('finish', function () {
                if (typeof cb === 'function')
                    cb()
            })
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

    console.log('inject to index.html');
    injectScriptToHtml(callback)
})

// 启动服务器并监控文件
gulp.task('default', gulp.series('init:injectTpl', 'init:injectJs', [function () {
    console.log('ready')
}]));

gulp.task('build', function (callback) {
    // runSequence(callback)
});

