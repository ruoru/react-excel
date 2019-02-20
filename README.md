# react-excel

<!-- [![Build Status](https://img.shields.io/travis/ruoru/react-excel.svg?style=flat-square)](https://travis-ci.org/ruoru/react-excel)
[![Codecov](https://img.shields.io/codecov/c/github/ruoru/react-excel/master.svg?style=flat-square)](https://codecov.io/gh/ruoru/react-excel/branch/master)
[![Dependency Status](https://img.shields.io/gemnasium/react-component/trigger.svg?style=flat-square)](https://gemnasium.com/ruoru/react-excel)

[![NPM Version](https://img.shields.io/npm/v/react-excel.svg?style=flat-square)](https://www.npmjs.org/package/react-excel)
[![NPM Downloads](http://img.shields.io/npm/dm/react-excel.svg?style=flat-square)](https://npmjs.org/package/react-excel) -->

English | [简体中文](README-zh_CN.md)

Like a simple excel for a react component.

## Support environment

* Chrome 72+

## Applicable scene

1. In computer;
2. Like excel add or delete rows or columns, edit cell, and export to excel;
3. Sort by column;
4. Simple calculation;

## Remaining problem

* [ ] Select n \* m cells, select this row when click row index, column is too;
* [ ] Sort by column;
* [ ] Add rows/colums in whatever local, delete select rows/columns or cells;
* [ ] Simple calculation;
* [ ] A small amount of DOM simulates a lot of DOM;

## Interface design

| property name          | description                                                                         | type                                              | default                                                           |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| data \*                | The data source of the 2D table.                                                    | Array                                             | []                                                                |
| onChange \*            | Callback method, each time you change the cell value will run of the method.        | Function (value, rowIndex, columnIndex)           | -                                                                 |
| style                  | CSS style object.                                                                   | Object                                            | -                                                                 |
| className              | class name.                                                                         | String                                            | -                                                                 |
| minCellWidth           | Min width for each cell.                                                         | Number                                            | 120                                                               |
| cellHeight             | Height for each cell.                                          | Number                                            | 28                                                                |
| pageSize               | Determine the height of the table based on page size.                                  | Number                                            | 20                                                                |

Data format like is:

```js
[
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A4', 'B4', 'C4', 'D4'],
  ['A5', 'B5', 'C5', 'D5'],
  ['A6', 'B6', 'C6', 'D6'],
]
```

## Install

```bash
npm install react-excel --save
```

## Example Code

[demo.js code](./example/views/Picker.js)

## Local development

```sh
$ git clone https://github.com/ruoru/react-excel.git
$ npm install
$ npm start
```