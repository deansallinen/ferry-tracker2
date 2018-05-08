const scraper = require("table-scraper");
const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');
// var util = require("util");
const assert = require('assert');
// const monk = require("monk");
const url = 'mongodb://deza604-ferry-tracker-2-5483816:27017/ferrytracker';
// const db = monk(monkurl);
// const collection = db.get('ferrytracker');


const getRouteInfo = array => ({
    route_name: array[0][0].split("Sailing time: ")[0],
    average_sailing: array[0][0].split("Sailing time: ")[1],
    sailing_date: new Date(array[0][1]).toISOString().substr(0, 10),
});

const getRouteSailings = input => {
    let sailings = input.map(x => createSailing(x));
    sailings.shift();
    return sailings;
};

const createSailing = object => {
    let sailing = {};
    sailing.vessel = object[0];
    sailing.scheduled_departure = object[1];
    sailing.actual_departure = object[2];
    sailing.eta = object[3];
    sailing.sailing_status = object[4];
    return sailing;
};

// Mongo Code
// 
// const createSchedule = data => {
//     let l = data.length;
//     let allRoutes = [];
//     for (var i = 2; i < l; i = i + 2) {
//         let info = getRouteInfo(data[i]);
//         info[info.date] = getRouteSailings(data[i + 1]);
//         allRoutes.push(info);
//     }
//     return allRoutes;
// };

const createSchedule = data => {
    let l = data.length;
    let allRoutes = [];
    for (var i = 2; i < l; i = i + 2) {
        let info = getRouteInfo(data[i]);
        let sailings = getRouteSailings(data[i + 1]);
        sailings.map(sailing => Object.assign(sailing, info))
            .map(sailing => allRoutes.push(sailing));
        // allRoutes.push(sailings);
    }
    return allRoutes;
};

scraper.get('http://orca.bcferries.com:8080/cc/marqui/actualDepartures.asp')
    .then(result => console.log(createSchedule(result)));
