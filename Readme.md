# Pulp

Pulp is a library of tasks for [gulp](https://gulpjs.com/). It helps to quickly create a modular development workflow adapted to our projects.

## Principle

Pulp is made of different `gulp.task`, isolated in the `tasks` folder, exported as modules.

The main file is `default.js`: it imports all the tasks and defines various default sequences:
- a default/`run` task to build a project;
- a `watch` task to response to files updates;
- a `scss` and a `js` tasks for specific sequences of tasks to only build the styles and the scripts.

## How to use Pulp ?

### Dependencies

Pulp requires `gulp`, that requires Node.js and NPM.

#### Node.js

See the [download page](https://nodejs.org/en/download/current/) for macOS or Windows binaries, or the [package manager installations page](https://nodejs.org/en/download/package-manager/) for Linux distributions.

#### NPM

When you install node.js, npm is automatically installed. However, npm gets updated more frequently than Node.js, so be sure that you have the latest version.

To test, run `npm -v`.

If the version you see does not match the latest version, run:

`npm install npm@latest -g`.

This will install the latest official, tested version of npm.

NPM uses the `package.json` in the project directory to know which local packages are used in the project.

#### Gulp

[Gulp](https://gulpjs.com/) is a task manager to automate parts of the development workflow.

Gulp should be installed both globally and locally in the project.

Install the gulp command:

`npm install --global gulp-cli`

Install gulp in the devDependencies:

`npm install --save-dev gulp@next`

### Install

NPM uses the `package.json` in the project directory to know which local packages are used in the project.

Install Pulp in your NPM depencies:

`npm install @startup-palace/pulp-js --save-dev`

Gulp is managed with the `gulpfile.js`. It requires the external modules and defines the tasks we need for the development workflow.

### Run

To run in devloppement mode
`gulp`

To run in devloppement mode with watch tool
`gulp watch`

To run in prodction mode
`gulp --env production`

#### The gulpfile

Create a `gulpfile.js` in your root folder, and copy / paste:

```
var gulp            = require('gulp');
var merge           = require('lodash.merge');
var loadPlugins     = require('gulp-load-plugins');

var plugins = loadPlugins({
    config: merge(require('./node_modules/@startup-palae/pulp-js/package.json')),
    pattern: ['gulp{-,.}*', '@*/gulp{-,.}*', '*']
});

var manifest = require('./assets-manifest.json');

require('pulp-js')(gulp, plugins, manifest);
```

The gulpfile use 2 other dependencies here:

`npm install --save-dev lodash.merge gulp-load-plugins`

The former one is the Lodash method `merge` that helps us compile all the dependencies of Pulp (essentially the task plugins) into a unique object ; the latter one is a gulp plugin that allows us to load all these gulp plugins of Pulp without having to imperatively load each one.

This gulpfile will parse the NPM dependencies of Pulp and install them. It will then read a file named `assets-manifest.json` and execute the default file of Pulp.

#### The assets manifest

The `assets-manifest.json` is a config file that maps every tasks defined in Pulp to the files on which the task must apply. It allows some specific configuration, depending on each task.

See the sample:

```
{
    "name": "my-project",
    "build": "build",
    "tasks" : {
        "js": [
            {
                "name": "main",
                "dest": "build/js",
                "vendors": [
                    "node_modules/jquery/dist/jquery.js"
                ],
                "src": [
                    "src/_js/main.js"
                ],
                "watch": [
                    "src/_js/*.js"
                ]
            }
        ],
        "scss": [
            {
                "name": "website",
                "dest": "build/css",
                "critical-dest": "src/_temp/css",
                "src": [
                    "src/_scss/main.scss"
                ],
                "watch": [
                    "src/_scss/**/*.scss",
                ]
            }
        ],
        "rev": [
            {
                "src": [
                    "build/css/**",
                    "build/js/**"
                ],
                "base": "build",
                "dest": "src/_temp/data"
            }
        ],
        "copy": [
            {
                "src": [
                    "src/_img/**"
                ],
                "dest": "build/img"
            }
        ],
        "jekyll-build": {
            "watch": [
                "src/[^_]**",
            ]
        }
    }
}
```

Each configuration and task are clarified below.

## Tasks

### Angular template cache

Concatenates and registers AngularJS templates in the $templateCache.

See https://github.com/miickel/gulp-angular-templatecache

Sample of the `assets-manifest.json`:

```
"angular-template": [
    {
        "name": "main",
        "config": {
            "root": "partials/main",
            "module": "myProject"
        },
        "src": [
            "resources/assets/html/main/**/*.html"
        ]
    },
    {
        "name": "ui-bootstrap",
        "config": {
            "root": "uib/template",
            "module": "ui.bootstrap.tpls",
            "standalone": true
        },
        "src": [
            "resources/assets/html/ui-bootstrap/**/*.html"
        ]
    },
    {
        "name": "ng-table",
        "config": {
            "root": "ng-table",
            "module": "ngTable"
        },
        "src": [
            "resources/assets/html/ng-table/**/*.html"
        ]
    }
],
```

### Browser sync

Keep multiple browsers & devices in sync when building websites.

See https://github.com/BrowserSync/browser-sync

### Copy

Copy source files to new destination and use that destination as new source.

See https://github.com/klaascuvelier/gulp-copy

Sample of the `assets-manifest.json`:

```
"copy": [
    {
        "src": [
            "src/_img/**"
        ],
        "dest": "build/img"
    }
],
```

### Design tokens

The "design token build" task is a specific task which transforms design tokens (assets) in yaml into JSON and Sass.

Learn more at http://thibault.mahe.io/blog/design-tokens.html :)

Sample of the `assets-manifest.json`:

```
"design-tokens": [
    {
        "name": "variables",
        "src": [
            "src/_design-tokens/_options.yml",
            "src/_design-tokens/_decisions.yml"
        ],
        "dest": "src/_temp/_scss/"
    }
],
```

### Jekyll build

The "jekyll build" task is a task to compile the Jekyll file, executing the necessary `bundle exec jekyll build` command.

Sample of the `assets-manifest.json`:

```
"jekyll-build": {
    "watch": [
        "src/[^_]**",
        "src/**/*.html",
        "src/**/*.scss",
        "src/_includes/**",
        "src/_layouts/**"
    ]
}
```

### JS build

The "js build" task is a package of mulitple gulp tasks to build the scripts:

In dev (default):
- **Babelify** (Babel browserify transform): helps to write code in the latest version of JavaScript and make the transform to a supported version (see https://github.com/babel/babelify)
- **Add-src** and **Concat**: concats differents sources and files (see https://github.com/gulp-community/gulp-concat)

In prod (with the prod command):
- **ngAnnotate**: adds angularjs dependency injection annotations (see https://github.com/Kagami/gulp-ng-annotate)
- **uglify**: minifies JavaScript (see https://github.com/terinjokes/gulp-uglify)
- **Rename**: rename the output file according to the option given in the manifest (see https://github.com/hparra/gulp-rename)

Sample of the `assets-manifest.json`:

```
"js": [
    {
        "name": "main",
        "dest": "build/js",
        "vendors": [
            "node_modules/jquery/dist/jquery.js",
            "src/_js/_cookieChoices.js"
        ],
        "src": [
            "src/_js/main.js"
        ],
        "watch": [
            "src/_js/*.js"
        ]
    }
],
```

### JS lint

A task for identifying and reporting on patterns found in ECMAScript/JavaScript code.

See https://github.com/adametry/gulp-eslint

The parameters in the `assets-manifest.json` are the same as the JS build parameters.

The rules ared defined in the `.eslintrc` in the root folder.

### Rev

Static asset revisioning by appending content hash to filenames: unicorn.css → unicorn-d41d8cd98f.css (in prod only).

See https://github.com/sindresorhus/gulp-rev

Sample of the `assets-manifest.json`:

```
"rev": [
    {
        "src": [
            "build/css/**",
            "build/js/**"
        ],
        "base": "build",
        "dest": "src/_temp/data"
    }
],
```

(The `_temp` folder is used to not interfer with the jekyll building process)

### Scss build

The "Scss build" task is a package of mulitple gulp tasks to build the styes:

In dev (default):
- **sassGlob**: allows global imports in Sass, for instance `@import 'vars/**/*.scss';` (see https://github.com/mikevercoelen/gulp-sass-glob)
- **Sass**: compiles the Sass files (see https://github.com/dlmanning/gulp-sass)
- **Autoprefixer**: automactically prefixes the CSS (see https://github.com/sindresorhus/gulp-autoprefixer)
- **CSS count**: analyse CSS files and log simple metrics (see https://github.com/orlinbox/gulp-css-count)
- **PostCSS Critical Split**: takes existing CSS files and splits out the annotated critical styles into a seperate file, in order to create a specific critical CSS that will be then manually inlined in the HTML (see https://github.com/mrnocreativity/postcss-critical-split)
- **Rename**: rename the output file according to the option given in the manifest (see https://github.com/hparra/gulp-rename)

In prod (with the prod command):
- **PostCSS Flexbugs Fixes**: "tries" to fix all of flexbug's issues (see https://github.com/luisrudge/postcss-flexbugs-fixes)
- **CSSO**: minifies CSS with CSSO (see https://github.com/ben-eb/gulp-csso)

Sample of the `assets-manifest.json`:

```
"scss": [
    {
        "name": "website",
        "dest": "build/css",
        "critical-dest": "src/_temp/css",
        "src": [
            "src/_scss/main.scss"
        ],
        "watch": [
            "src/_scss/**/*.scss",
            "temp/_scss/*.scss"
        ]
    }
],
```

### Scss lint

A task for identifying and reporting on patterns found in Sass code.

See https://github.com/sasstools/gulp-sass-lint

The parameters in the `assets-manifest.json` are the same as the Scss build parameters.

The rules ared defined in the `.sass-lint.yml` in the root folder.







