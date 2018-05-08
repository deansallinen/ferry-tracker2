const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ferrytracker.db');

// const test = {
//     vessel: 'Queen of New Westminster',
//     scheduled_departure: '8:00 AM',
//     actual_departure: '8:00 AM',
//     eta: '9:26 AM',
//     sailing_status: 'On Time',
//     route_name: 'Tsawwassen to Swartz Bay',
//     average_sailing: '1 hour 35 minutes',
//     sailing_date: '2018-05-07'
// };

// function createTable() {
//     db.serialize(function() {
//         db.run('CREATE TABLE sailings (\
//                 route_name TEXT, \
//                 average_sailing TEXT, \
//                 sailing_date TEXT, \
//                 vessel TEXT, \
//                 scheduled_departure TEXT, \
//                 actual_departure TEXT, \
//                 eta TEXT, \
//                 sailing_status TEXT \
//                 )');
//     });
// }

// createTable();

function insertDb(sailing) {
    const keys = Object.keys(sailing).join(', ');
    const placeholders = Object.keys(sailing).fill('?').join(', ');
    // db.serialize(function() {
    db.run('INSERT INTO sailings (' + keys + ') \
        VALUES (' + placeholders + ');', Object.values(sailing)), (err) => { throw err };
    // });
    // db.close();
}

insertDb(test);
