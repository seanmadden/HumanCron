'use strict';
//min hour dom moy dow
function Base_expression() {
    this.minute = "*";
    this.hour = "*";
    this.day_of_month = "*";
    this.month_of_year = "*";
    this.day_of_week = "*";
}

Base_expression.prototype.toString = function() {
    return `${this.minute} ${this.hour} ${this.day_of_month} ${this.month_of_year} ${this.day_of_week}`
};

Base_expression.prototype.setProp = function(prop, value) {
    if (this.hasOwnProperty(prop)) {
        this[prop] = value.trim();
    } else {
        throw Error("Invalid property name");
    }
};

//const base_expression = {
//    "minute": "*",
//    "hour": "*",
//    "day_of_month": "*",
//    "month_of_year": "*",
//    "day_of_week": "*"
//};
const DAYS_OF_WEEK = {
    'sunday': '0',
    'monday': '1',
    'tuesday': '2',
    'wednesday': '3',
    'thursday': '4',
    'friday': '5',
    'saturday': '6'
};


var parser = function (english) {
    english = english.toLowerCase();

    if (!english.startsWith("every")) {
        throw Error("Only statements beginning with 'every' can be parsed at this time");
    }


    //TODO: create a new object from the base_expression
    //let expression = Object.create({}, base_expression);
    //console.log(expression);
    let expression = new Base_expression();

    //TODO: see if I can graby every <day_of_week> - I forget the syntax right now
    let pattern = "((mon|tues|wednes|thurs|fri|satur|sun)day)";
    let frequency = pattern.exec(english);
    if (frequency) {
        frequency = frequency[0];
        expression.setProp('day_of_week', DAYS_OF_WEEK[frequency]);
    }

    let time = english.split(" at ")[1].split(":");
    expression.setProp('minute', time[1]);
    expression.setProp('hour', time[0]);

    return expression.toString();
};



module.exports = parser;