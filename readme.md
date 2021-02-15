# Electron-React-Parcel-Boilerplate
![Build/release](https://github.com/bung87/localhost-electron-react-parcel-boilerplate/workflows/Build/release/badge.svg?branch=main)
[![Travis CI](https://img.shields.io/travis/com/bung87/electron-react-parcel-boilerplate/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.com/bung87/electron-react-parcel-boilerplate)
[![Azure Pipelines](https://img.shields.io/vso/build/bung87/electron-react-parcel-boilerplate/9/master.svg?label=Azure%20Pipelines&style=flat-square)](https://dev.azure.com/bung87/electron-react-parcel-boilerplate/_build/latest?definitionId=9)
[![Dependencies Status](https://img.shields.io/david/bung87/electron-react-parcel-boilerplate.svg?style=flat-square)](https://david-dm.org/bung87/electron-react-parcel-boilerplate)
[![DevDependencies Status](https://img.shields.io/david/dev/bung87/electron-react-parcel-boilerplate.svg?style=flat-square)](https://david-dm.org/bung87/electron-react-parcel-boilerplate?type=dev)

A boilerplate for Electron + React + Parcel.

# Usage
## Install dependencies
First, you must install dependencies.
```shell
$ yarn install
```

## Start hacking
Now you can start hacking by executing the following command.
```shell
$ yarn start
```
You will edit the files under `renderer` basically, or under `main` if you want to configure Electron.

## Deploy your application
The command below deploys your application.
```shell
$ yarn release
```  

### env
``` js
{
node: '12.18.3',
v8: '8.7.220.31-electron.0',
uv: '1.38.0',
zlib: '1.2.11',
brotli: '1.0.7',
ares: '1.16.0',
modules: '85',
nghttp2: '1.41.0',
napi: '6',
llhttp: '2.0.4',
http_parser: '2.9.3',
openssl: '1.1.1',
icu: '67.1',
unicode: '13.0',
electron: '11.2.1',
chrome: '87.0.4280.141'
}
```