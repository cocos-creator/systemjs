# SystemJS

This is a patched version SystemJS based on [SystemJS](https://github.com/systemjs/systemjs).

# Change logs

### 1.0.0

Base version: 6.2.5

Base commit: 55902716abffc791c15e4a2ef033876c280ae411

#### Acquiring import maps control

SystemJS officially supports import maps.
It loads import maps through DOM elements with script tag of type 'systemjs-importmap'.
However some JavaScript environments do not have a conforming DOM at runtime,
such as WeChat game or Quick game liked platform.

So we:
- Replace internal import map, that is used for final resolving, into runtime hooks `.patches.importMap`;
- The original way how to acquiring import maps is moved into extra named 'dom-import-map';
- The entire './src/common.js' module is exported as `.patches.common`.
