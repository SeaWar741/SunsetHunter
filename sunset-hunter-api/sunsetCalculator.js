//funciones para calcular la calidad del sunset o del sunrise
//se basan en este webiste https://digital-photography-school.com/predicting-dramatic-sunsets/
//podria llegar a añadirse temperatura pero es tentativo junto con dew point


//create function to calculate dew point
function calculateDewPoint(temperature, humidity) {
    //calculate dew point
    var dewPoint = (Math.log(humidity / 100) + ((17.27 * temperature) / (237.7 + temperature))) * (237.7 + temperature) / 17.27;
    //return dew point
    return dewPoint;
}

//create a formula to calculate the sunset quality
function calculateSunsetSunriseQuality(cloudCover, temperature, airQuality, humidity, windSpeed,precipitation) {
    var quality = 0;
    var cloudCoverValue = cloudCover;
    //var dewPointValue = calculateDewPoint(temperature, humidity);
    var airQualityValue = airQuality;
    var humidityValue = humidity;
    var windSpeedValue = windSpeed; //kph
    var precipitationValue = precipitation; //mm
    
    //lower humidity is better for the sunset
    //30% to 70% cloud cover is good for the sunset
    //medium wind speed is good for the sunset
    //low dew point is good for the sunset
    //high air quality is good for the sunset (us-epa-index)
    //create a formula to calculate the quality of the sunset
    
    
    //excelent quality
    //cloud cover is less than 60% but higher than 30%
    //humidity is less than 40%
    //air quality is between 1 and 2
    //wind speed is higher than 10 kph and lower than 40 kph
    //precipitation is less than 1 mm
    if (cloudCoverValue < 60 && cloudCoverValue > 30 && humidityValue < 40 && airQualityValue > 1 && airQualityValue < 2 && windSpeedValue > 10 && windSpeedValue < 40 && precipitationValue < 1) {
        quality = 5;
    }
    

    //very good quality
    //cloud cover is less than 60% but higher than 30%
    //humidity is less than 50%
    //air quality is between 1 and 2
    //wind speed is higher than 10 kph and lower than 50 kph
    //precipitation is less than 1 mm
    if (cloudCoverValue < 60 && cloudCoverValue > 30 && humidityValue < 50 && airQualityValue > 1 && airQualityValue < 2 && windSpeedValue > 10 && windSpeedValue < 50 && precipitationValue < 1) {
        quality = 4;
    }

    //good quality
    //cloud cover is less than 60% but higher than 20%
    //humidity is less than 60%
    //air quality is between 1 and 2
    //wind speed is higher than 10 kph and lower than 60 kph
    //precipitation is less than 1 mm
    if (cloudCoverValue < 60 && cloudCoverValue > 20 && humidityValue < 60 && airQualityValue > 1 && airQualityValue < 2 && windSpeedValue > 10 && windSpeedValue < 60 && precipitationValue < 1) {
        quality = 3;
    }

    //medium quality
    //cloud cover is less than 70% but higher than 20%
    //humidity is less than 65%
    //air quality is between 1 and 2
    //wind speed is higher than 10 kph and lower than 70 kph
    //precipitation is less than 1 mm
    if (cloudCoverValue < 70 && cloudCoverValue > 20 && humidityValue < 65 && airQualityValue > 1 && airQualityValue < 2 && windSpeedValue > 10 && windSpeedValue < 70 && precipitationValue < 1) {
        quality = 2;
    }

    //bad quality
    //cloud cover is less than 80% but higher than 20%
    //humidity is less than 70%
    //air quality is higher than 2
    //wind speed is higher than 50 kph 
    //precipitation is more than 1 mm
    if (cloudCoverValue < 80 && cloudCoverValue > 20 && humidityValue < 70 && airQualityValue > 2 && windSpeedValue > 50 && precipitationValue > 1) {
        quality = 1;
    }

    //very bad quality
    else{
        quality = 0;
    }

    
    //visibility as a multiplier
    //if visibility is avobe 10 km, the quality adds 5 points
    //if visibility is between 5 km and 10km, the quality adds 4 points
    //if visibility is between 2 km and 5km, the quality adds 3 points
    //if visibility is between 1 km and 2km, the quality adds 2 points
    //if visibility is below 1 km, the quality adds 1 point
    //if visibility is below 0.5 km, the quality is 0
    if (visibility > 10) {
        quality += 5;
    }
    else if (visibility > 5 && visibility < 10) {
        quality += 4;
    }
    else if (visibility > 2 && visibility < 5) {
        quality += 3;
    }
    else if (visibility > 1 && visibility < 2) {
        quality += 2;
    }
    else if (visibility < 1) {
        quality += 1;
    }
    else if (visibility < 0.5) {
        quality = 0;
    }

    //return the quality of the sunset as a percentage where 100%(10 points) is excelent and 0%(0 points) is very bad
    quality = quality * 10;
    return quality;
    

}