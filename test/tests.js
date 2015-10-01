'use strict';
const vows = require('vows'),
    assert = require('assert'),
    cronParser = require('cron-parser'),
    englishToCron = require('../parser');

const testOptions = {
    currentDate: new Date("Jan 1, 2012"),
    endDate: new Date("Dec 31, 2012"),
    iterator: true
};

vows.describe('Parsing english to cron syntax').addBatch({
    'Daily task': {
        topic: function () {
            return englishToCron("Every day at 16:00");
        },

        'we get a parseable cron syntax': function (topic) {
            assert.doesNotThrow(() => {
                cronParser.parseExpression(topic);
            }, Error);
        },
        'we get the correct cron syntax': function(topic) {
            assert.equal(topic, "00 16 * * *", "Every day at 16:00 was not parsed correctly!");
        }

    },
    'when provided an invalid syntax': {
        topic: "Garbage input",

        'an error is thrown': function(topic) {
            assert.throws(() => {
                englishToCron(topic);
            }, Error);
        }
    },
    'Monthly tasks': {
        //topic: function () { return 42 / 0 },
        //
        //'we get Infinity': function (topic) {
        //    assert.equal (topic, Infinity);
        //}
    },
    'Weekly task': {
        topic: function() {
            return englishToCron("every saturday at 12:00");
        },

        'is parsed correctly': function(topic) {
            assert.equal(topic, '00 12 * * 6', "Every saturday at 12:00 was not parsed correctly")
        }
    },
    'Yearly': {}
}).run(); // Run it

function printJob(cronExpression) {
    while (cronExpression.hasNext()) {
        console.log(cronExpression.next().value.toString());
    }
}