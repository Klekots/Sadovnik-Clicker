const moment = require('moment');

const date = moment(Date.now()); 
const day = date.day();

module.exports = {
    day
}

// Неділя - 0
// Понеділок - 1
// Вівторок - 2
// Середа - 3
// Четвер - 4
// П'ятниця - 5
// Субота - 6