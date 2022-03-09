---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Climate.md
relativePath: elvenware/development/web/Climate.md
title: Climate
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

====================================

http://www.eia.gov/todayinenergy/detail.cfm?id=25852
http://www.eia.gov/beta/MER/index.cfm#/?f=A&start=1949&end=2015&charted=4-6-7-14

=====================================================

http://www.cleanpower.com/products/solaranywhere/solaranywhere-api/
http://www.cleanpower.com/


=================================================

http://developer.nrel.gov/docs/solar/openpv/
http://developer.nrel.gov/docs/solar/openpv/installs_rankings/
http://developer.nrel.gov/docs/solar/solar-resource-v1/
https://developer.nrel.gov/docs/solar/solar-resource-v1/

https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=DEMO_KEY&lat=40&lon=-105




=-====================================================


http://data.worldbank.org/developers/climate-data-api

 http://climatedataapi.worldbank.org/climateweb/rest/, 
 
 http://climatedataapi.worldbank.org/climateweb/rest/, 
 http://climatedataapi.worldbank.org/climateweb/rest/v1/country/type/var/start/end/ISO3[.ext]
 http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2020/2039/USA.json
 
 type is one of:



mavg
Monthly average
annualavg
Annual average
manom
Average monthly change (anomaly).  The control period is 1961-1999 for temperature and precipitation variables, and 1961-2000 for derived statistics.
annualanom
Average annual change (anomaly). The control period is 1961-1999 for temperature and precipitation variables, and 1961-2000 for derived statistics.


var is one of:

pr
Precipitation (rainfall and assumed water equivalent), in millimeters
tas
Temperature, in degrees Celsius



Past
start	end
1920 1939
1940 1959
1960 1979
1980 1999
Future
start	end
2020 2039
2040 2059
2060 2079
2080 2099

ISO3 is an ISO3 country code, indicating the country for the data request.

ext is optional, and indicates the response type:  CSV, JSON or XML (the default is JSON). For JSONP support, add the query parameter "?callback=handler" where "handler" is the name of your callback function.


get_data <- function(x){
    name <- x[1]
    yearstart <- x[2]
    if(yearstart<1939)
        startyear <- 1920
        endyear <- 1939
    if(1939<yearstart & yearstart<=1939+20)
        startyear <- 1920+20
        endyear <- 1939+20
    if(1939+20<yearstart & yearstart<=1939+40)
        startyear <- 1920+40
        endyear <- 1939+40
    if(1939+40<yearstart & yearstart<=1939+60)
        startyear <- 1920+60
        endyear <- 1939+60
    if(yearstart<1920)
        return(c(NA, NA))
    if(yearstart>1999)
        return(c(NA, NA))
    cbind(get_model_temp(name, "mavg", startyear, endyear), 
      rep(seq(1960, 1979), each = 12))
}

