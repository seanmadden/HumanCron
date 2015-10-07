'use strict';
//min hour dom moy dow
const Base_expression = {
    minute: "*",
    hour: "*",
    day_of_month: "*",
    month_of_year: "*",
    day_of_week: "*",
    toString: function() {
        return `${this.minute} ${this.hour} ${this.day_of_month} ${this.month_of_year} ${this.day_of_week}`;
    },
    setProp: function(prop, value) {
        if (this[prop] !== 'underfined') {
            this[prop] = value.trim();
        } else {
            throw Error("Invalid property name: " + prop);
        }
    }
};

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

    let expression = Object.create(Base_expression);

    let pattern = "((mon|tues|wednes|thurs|fri|satur|sun)day)";
    let frequency = english.match(pattern);
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