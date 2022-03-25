
const { response } = require('express');

const UserSchema = require('../models/user');
const { calculateDewPoint, calculateSunsetSunriseQuality, removeDiacritics } = require('../models/sunsetCalculator');

//TODO: posiblemente cambie
const axios = require('axios');


module.exports = {
	

    // Add a new site to the user's list of sites
    addSite: async ( req, res = response ) => {

        // First we verify that the user exists, if not, we register it.
        const { id, name, email } = req.body;
        let user = await UserSchema.findOne({ id });

        if(!user) {
            user = new UserSchema({
                id,
                name,
                email,
                sites: []
            });
            try {
                await user.save();
                console.log(`User created with id: ${user._id}`);
            }
            catch ( err ) {
                res.status(503).send(`Error: ${err.message}`);
                console.log(err.message);
            }
        }

		// We check that the cities we receive are not already had by the user
		let sites = req.body.sites;

		sites = sites.filter(val => !user.sites.includes(val));

		// We save sites
		Array.prototype.push.apply(user.sites, sites);
		await user.save()
		.then(
			res.status(200).send("List updated")
		)
		.catch(
			err => handleError(err)
		);
		

    },

	//Remove a site from the list
	removeSite: async (req, res = response) => {

		
		const { id, name, email } = req.body;
		let user = await UserSchema.findOne({ id });

		let sites = req.body.sites;
		let oldsites = user.sites;

		sites = oldsites.filter(elem => !sites.includes(elem)); // filter the site to be removed

		user.sites = sites; //replace the old array with a new one and save
		await user.save()
			.then(
				res.status(200).send("List updated")
			)
			.catch(
				err => handleError(err)
			);


	},
	updateSite: async (req, res = response) => {


		// const { id, name, email } = req.body;
		// let user = await UserSchema.findOne({ id });

		// // We check that the cities we receive are not already had by the user
		// let site_update = req.body.sites;
		// let oldsites = user.sites;

		// sites = oldsites.filter(elem => !sites.includes(elem));

		// // We save sites
		// user.sites = sites;
		// await user.save()
		// 	.then(
		// 		res.status(200).send("List updated")
		// 	)
		// 	.catch(
		// 		err => handleError(err)
		// 	);


	},

	getSites: async ( req, res = response ) => {

		const { id } = req.body;
		let user = await UserSchema.findOne({ id });

		const key = process.env.KEY;
		let info = [];
		

		if (user) {
			user.sites.forEach( site => {

				// We eliminate diacritics
				let url_site = site.split(' ').join('%20');
				url_site = removeDiacritics(url_site);
				
				let url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${url_site}&days=5&aqi=yes&alerts=no`;
				 
				axios.get(url).then( resp => {

					// We calculate if it is a good sunrise
					let currentDaySunrise = calculateSunsetSunriseQuality(
						resp.data.forecast.forecastday[0].hour[6].cloud,
						resp.data.forecast.forecastday[0].hour[6].temp_c,
						resp.data.current.air_quality["us-epa-index"],
						resp.data.forecast.forecastday[0].hour[6].humidity,
						resp.data.forecast.forecastday[0].hour[6].wind_kph,
						resp.data.forecast.forecastday[0].hour[6].precip_mm,
						resp.data.current.vis_km
					);

					// We calculate if it is a good sunset
					let currentDaySunset = calculateSunsetSunriseQuality(
						resp.data.forecast.forecastday[0].hour[18].cloud,
						resp.data.forecast.forecastday[0].hour[18].temp_c,
						resp.data.current.air_quality["us-epa-index"],
						resp.data.forecast.forecastday[0].hour[18].humidity,
						resp.data.forecast.forecastday[0].hour[18].wind_kph,
						resp.data.forecast.forecastday[0].hour[18].precip_mm,
						resp.data.current.vis_km
					);

					let site_info = {
						name: site,
						last_days: [
							{
								date: resp.data.forecast.forecastday[0].date,
								sunrise: resp.data.forecast.forecastday[0].astro.sunrise,
								sunrise_temp: resp.data.forecast.forecastday[0].hour[6].temp_c,
								good_sunrise: currentDaySunrise,
								sunset: resp.data.forecast.forecastday[0].astro.sunset,
								sunset_temp: resp.data.forecast.forecastday[0].hour[18].temp_c,
								good_sunset: currentDaySunset
							},
							{
								date: resp.data.forecast.forecastday[1].date,
								sunrise: resp.data.forecast.forecastday[1].astro.sunrise,
								sunrise_temp: resp.data.forecast.forecastday[1].hour[6].temp_c,
								sunset: resp.data.forecast.forecastday[1].astro.sunset,
								sunset_temp: resp.data.forecast.forecastday[1].hour[18].temp_c,
							},
							{
								date: resp.data.forecast.forecastday[2].date,
								sunrise: resp.data.forecast.forecastday[2].astro.sunrise,
								sunrise_temp: resp.data.forecast.forecastday[2].hour[6].temp_c,
								sunset: resp.data.forecast.forecastday[2].astro.sunset,
								sunset_temp: resp.data.forecast.forecastday[2].hour[18].temp_c,
							}
						]
					};

					// console.log(site_info);
					info.push(site_info);
					console.log(info);
				})
				.catch( err => {
					console.log(err);
					
				})

			});
			console.log(info);
		
			res.status(200).json(info);
			
		}
		
	},

	// Obtain information from a specific site
	getSite: async ( req, res = response ) => {

		const { city_name } = req.body;
		const key = process.env.KEY;

		const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city_name}&days=5&aqi=yes&alerts=no`;

		axios.get(url).then( resp => {

			// We calculate if it is a good sunrise
			let currentDaySunrise = calculateSunsetSunriseQuality(
				resp.data.forecast.forecastday[0].hour[6].cloud,
				resp.data.forecast.forecastday[0].hour[6].temp_c,
				resp.data.current.air_quality["us-epa-index"],
				resp.data.forecast.forecastday[0].hour[6].humidity,
				resp.data.forecast.forecastday[0].hour[6].wind_kph,
				resp.data.forecast.forecastday[0].hour[6].precip_mm,
				resp.data.current.vis_km
			);
		
			// We calculate if it is a good sunset
			let currentDaySunset = calculateSunsetSunriseQuality(
				resp.data.forecast.forecastday[0].hour[18].cloud,
				resp.data.forecast.forecastday[0].hour[18].temp_c,
				resp.data.current.air_quality["us-epa-index"],
				resp.data.forecast.forecastday[0].hour[18].humidity,
				resp.data.forecast.forecastday[0].hour[18].wind_kph,
				resp.data.forecast.forecastday[0].hour[18].precip_mm,
				resp.data.current.vis_km
			);

			// Create a new JSON object array
			let info = [
				{
					date: resp.data.forecast.forecastday[0].date,
					sunrise: resp.data.forecast.forecastday[0].astro.sunrise,
					sunrise_temp: resp.data.forecast.forecastday[0].hour[6].temp_c,
					good_sunrise: currentDaySunrise,
					sunset: resp.data.forecast.forecastday[0].astro.sunset,
					sunset_temp: resp.data.forecast.forecastday[0].hour[18].temp_c,
					good_sunset: currentDaySunset
				},
				{
					date: resp.data.forecast.forecastday[1].date,
					sunrise: resp.data.forecast.forecastday[1].astro.sunrise,
					sunrise_temp: resp.data.forecast.forecastday[1].hour[6].temp_c,
					sunset: resp.data.forecast.forecastday[1].astro.sunset,
					sunset_temp: resp.data.forecast.forecastday[1].hour[18].temp_c,
				},
				{
					date: resp.data.forecast.forecastday[2].date,
					sunrise: resp.data.forecast.forecastday[2].astro.sunrise,
					sunrise_temp: resp.data.forecast.forecastday[2].hour[6].temp_c,
					sunset: resp.data.forecast.forecastday[2].astro.sunset,
					sunset_temp: resp.data.forecast.forecastday[2].hour[18].temp_c,
				}
				
			];

			console.log( info );
			res.status(200).send( info );	

		})
		.catch( err => {
			console.log(err);
		});

	}



}3