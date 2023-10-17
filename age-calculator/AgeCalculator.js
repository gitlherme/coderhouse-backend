const moment = require('moment');

const currentDate = moment();
const birthDate = moment('25/12/2000', 'DD/MM/YYYY');

const birthDateIsValid = birthDate.isValid();

if (birthDateIsValid) console.log(`Se passaram ${currentDate.diff(birthDate, 'days')} dias desde seu nascimento até hoje`);