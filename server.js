const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

console.table([
    {
      name: 'foo',
      age: 10
    }, {
      name: 'bar',
      age: 20
    }
  ]);