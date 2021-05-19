# py-web-vue

Python package that let you create web based application by just writting a Python file and forget about JavaScript.
PyWebVue rely on a pre-built generic web client that let you focus on what matters to you.
In order to reduce the burden on both side we took an oppiniated approach that might not fit every needs but should satisfy most of the use cases for building a Vue.js based application relaying on a Python server for heavier computation while offering efficient communication paradigms to enable interactive 3D visualization using VTK or ParaView.

In other words, we are providing a "battery included framework" which allow you to easily leverage either VTK/ParaView/vtk.js library.
None of those libraries are a requirement for taking advantage of this framework but it was designed with those libraries in mind.

## Getting started

__PyWebVue__ is a Python package that can be installed via pip and will provide all the pieces that you need to create your dynamic web application without touching any JavaScript.

PyWebVue is relaying on a Vue.js stack for its client side and provide access to a __Router__, widgets via __Vuetify__, __Material Design Icons__ and methods to edit and update a global state. The web interface will be done by writing a single HTML file using the Vue syntax of its template. Of course you can break that big template into smaller chunks using Python string template but at the end we are expecting a text content that should match some html content using the Vue.js syntax.

What __PyWebVue__ is offering is a simple Python based API for:
  - defining your HTML content
  - synchronize a common state between the server and the client
  - link python methods with pieces of state modification
  - call methods from client to server
  - call methods from server to client
  - serve your own resources (data, js, css, vue libraries, ...)
  - define routes for various HTML content based on URL
  - define favicon and icon shortcuts

### HTML templating

Obviously if you plan to create a Web application you will have to write some HTML to some extent. With PyWebVue we've choosen to leverage [Vuetify](https://vuetifyjs.com/en/) for building the content of your web application. Of course, you don't have to, but we feel that it is a well balanced library to create your UI without requiring to define your own CSS or component and it give you enough freedom to do all of it from a template file.

So the idea behind PyWebVue and HTML templating is to write the HTML section of the app that lives in the `<body></body>` section of an HTML page using the vue.js/vuetify syntax.

You can find a basic example of an `app.py` content example below to illustrate what we mean by __HTML templating__.

```python
from pywebvue import App

app = App('Super cool web app')

app.layout = '''
    <v-app>
        <v-app-bar app>
            <v-icon class="mr-4">mdi-menu</v-icon>
            Welcome
            <v-spacer />
        </v-app-bar>
        <v-main>
            <v-container fluid>
                Hello World, this is my first Web App...
            </v-container>
        </v-main>
    </v-app>
'''

if __name__ == "__main__":
    app.run_server()
```

As a add-on you can also set a file path relative to your `app.py` file to `app.layout` and even have that updated while your application is running.
That way you can write something like that:

```python
app.layout = './template-1.html'

def update_page(index=1):
    app.layout = f'./template-{index}.html'
```

More over if you are loading an external library using `app.vue_use = [...]` you could replace the runtime compiled template to an existing component by setting `app.layout = '#my-component-name'`.

### State handling

If you want to involve a Python server it is most likely because you want to control the Web UI from some functions at the Python level. A convinient approach that we took was to define a state and let both the client and the server read and write to it. The library will take care of synchronizing both side for you. You just need to use `set(key, value)` and `get(key)` along with the annotation `@app.change(key1, key2, ...)` to automatically bind a method execution when a given value for a key has been modified by either side. You should also define an initial state inside your app.

The example below capture how to use the state synchronisation:

```python
from pywebvue import App

app = App('State synchronization')

app.state = {
    'magic.number': 3.14159,
    'server.message': 'Let start with Pi',
}

@app.change('magic.number')
def update_message():
    value = app.get('magic.number')

    if value > 1:
        app.set('server.message', 'What a nice positive number')

    if value < 1:
        app.set('server.message', 'What a nice negative number')

    if value ** 2 < 1:
        app.set('server.message', 'Oh that is a small number')

    if value > 20:
        app.set('magic.number', 3.14159)
        app.set('server.message', 'Sorry I did not like your number, I prefer Pi')


app.layout = '''
    <v-app>
        <v-app-bar app>
            <v-icon class="mr-4">mdi-menu</v-icon>
            Welcome
            <v-spacer />
        </v-app-bar>
        <v-main>
            <v-container fluid>
                {{ get('magic.number') }} - {{ get('server.message') }}
                <v-btn @click="set('magic.number', 100 * (Math.random() - 0.5))">Random</v-btn>
            </v-container>
        </v-main>
    </v-app>
'''

if __name__ == "__main__":
    app.run_server()
```

### Calling a method

It may happen that relying on the state might not be enough and you are looking to execute a method somewhere.

#### From HTML to Python

Here is an example on how to do it:

```python
@app.trigger('some.unique.name')
def server_call(*args, **kwargs):
    print('Args', *args)
    print('Kwargs', **kwargs)
```

```html
<v-btn @click="trigger('some.unique.name', ['arg0', 'arg1'], { a: 1, b: 'str' })">Trigger</v-btn>
```

#### From Python to HTML

Here is an example on how to do that:

```python
def call_client_mehod():
    app.update(ref='view', method='resetCamera', args=[])
```

```html
<vtk-view ref="view" />
```
### Serving your files over HTTP

It is possible that you may want to serve some of your own JavaScript, CSS or else such as data files.
To serve several local directory, you will have to set the `app.serve` field as a dictionary. The key correspond to the URL path while the value will correspond to the local directory content that you would like to serve.

```python
app.serve = {
    'assets': './www/assets',
    'local/css': './www/css',
    'local/js': './www/js',
    'data': './data',
}
```

### Loading CSS

Since you can serve your own CSS files, you can also load them in your web application by referencing them with `app.styles = ['/local/css/main.css', '/local/css/add-on.css']`.
### Loading Scripts

Since you can serve your own JavaScript files, you can also load them in your web application by using the following setup:

```python
app.scripts = ['/local/js/Vuetify.umd.min.js', '/local/js/AddOnWidgets.umd.min.js']
app.vue_use = ['Vuetify', 'AddOnWidgets'] # => Vue.use(window.Vuetify) + Vue.use(window.AddOnWidgets)
```

### Vue.use(...)

PyWebVue comes with `vuetify`, `router` and `vtk` built-in but if you plan to use the bundled ones, you will have to list them in `app.vue_use = ['vuetify']`.
Those 3 lowercase names are reserved to reference the built-in ones. But if you want to build your own Vuetify or else, you can do so by serving your library while triggering the `Vue.use()` for your plugin/library.

The string provided in your `vue_use` array will be processed like you will write it in JavaScript.
You can see some example below:

```python
app.vue_use = ['Vuetify', 'complex.example.Widget']
# Vue.use(window['Vuetify'])
# Vue.use(window['complex']['example']['Widget'])
```

### Handling routing

Vue Router is part of the bundle and you can enable it by registering it in your app as follow:

```python
app.vue_use = ['vuetify', 'router']
```

Then you can register your routes as follow:

```python
app.routes = [
  {
    'name': 'home',
    'path': '/',
    'component': {
      'template': '<div>Root path</div>',
    },
  },
  {
    'name': 'foo',
    'path': '/foo',
    'component': {
      'template': '<div>Foo path</div>'
    },
  },
  {
    'name': 'bar',
    'path': '/bar',
    'component': {
      'template': '<div>Bar path</div>',
    },
  },
]
```

And if you want a full working example, you can look at `./examples/00_getting_started/router/app.py`.

### Vuetify configuration

When using the built-in `vuetify` you can customize it by providing the option argument when instanciated inside the root `Vue` component.

This is done as follow:

```
app.vuetify = {
    'icons': {
        'iconfont': 'mdi',
        'values': {
          'add': 'mdi-database-plus-outline',
          'remove': 'mdi-database-minus-outline',
          'menu': 'mdi-menu',
        },
    },
    'theme': {
        'themes': {
          'light': {
            'primary': '#3f51b5',
            'secondary': '#b0bec5',
            'accent': '#8c9eff',
            'error': '#b71c1c',
          },
        },
    },
}
```

### FavIcon

You can provide your own favicon by pointing to an image file like below.

```
app.favicon = './favicon-196x196.png'
```

## Development tools

How to develop your HTML content fast and easily.

TODO
  - [ ] Live Web App server
    - [ ] Load/Save/Select state from a test suite
    - [ ] Render template.html live
    - [ ] Handle routes live
    - [ ] set/get state support / trigger sink

## Running an example from repo

### Build client

```
cd client
npm i
npm run build
```

### Install Python package in venv

```
python3 -m venv py-env
source ./py-env/bin/activate
pip install -e ./python/
```

### Run demo

```
source ./py-env/bin/activate
python ./examples/.../app.py
```