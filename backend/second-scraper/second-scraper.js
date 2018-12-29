require('dotenv').config();
const scraper = require('table-scraper');
const { fromPairs, flatten } = require('lodash');
const moment = require('moment-timezone');
const { request } = require('graphql-request');
const { addWaits } = require('../queries/upsertRoute')
const endpoint = process.env.ENDPOINT


const scrapeConditions = async () => {
    try {
        const res = await scraper.get(
            'https://orca.bcferries.com/cc/marqui/at-a-glance.asp'
        );
        return res;
    } catch (err) {
        throw err;
    }
};

const getConditionsPromise = () =>
    scrapeConditions().then(res => {
        // console.log(res)
        return flatten(
            res.filter(each => each[0][0] ==='Route').map((each) => {
                const [headers, ...data] = each;
                // console.log(data)
                return data
                    .filter((element) => Object.keys(element).length > 3 && element[0])
                    .map((element) => {
                        const route = Object.values(element).filter(Boolean)
                        return {
                            routeName: route[0], 
                            percentFull: route[1].split(' full') // array of [sailingTime, percentage]
                                    .filter(Boolean)
                                    .map((x) => {
                                        const regex = /(\d{1,2}:\d\d[ap]m)(\d+)%/g
                                        const [_, time, percentage] = regex.exec(x)
                                        const timestamp = new moment(
                                            time,
                                            'hh:mmaa',
                                            'America/Vancouver'
                                        );
                                        // console.log(time, timestamp)
                                        return [timestamp, percentage];
                                    }),
                            carWaits: parseInt(route[route.length-3]),
                            oversizeWaits: parseInt(route[route.length-2]),
                        }
                })
            })
        );
    });

const getRouteId = async (routeName) => {
    // console.log(process.env.ENDPOINT)
    const query = `
    query routeId($routeName: String) {
        route(routeName: $routeName) {
          id
          routeName
        }
      }
    `
    const {route: {id}} = await request(endpoint, query, { routeName });
    return id
}

getConditionsPromise()
    .then(res => res.forEach(async route => {
        console.log(route)
        try {
            const res = await request(endpoint, addWaits, route);
            console.log(res)
        } catch (err) {
            throw err
        }
    }
    ))

module.exports = { getConditionsPromise, getRouteId };