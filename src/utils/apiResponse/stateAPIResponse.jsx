import _ from "lodash";

const setZipcodesInformation = (zipcodes) =>{
    if(_.isEmpty(zipcodes) || _.isNull(zipcodes)){
        return [];
    }

    return zipcodes.map((zipcode) => ({
        id: _.get(zipcode, "id", null),
        zipcode: _.get(zipcode, "zipcode", ""),
        label: _.get(zipcode, "zipcode", ""),
        value: _.get(zipcode, "id", null),
    }));
};

const setAreaNamesInformation = (areaNames) =>{
    if(_.isEmpty(areaNames) || _.isNull(areaNames)){
        return [];
    }

    return areaNames.map((areaName) => ({
        id: _.get(areaName, "id", null),
        name: _.get(areaName, "name", ""),
        label: _.get(areaName, "name", ""),
        value: _.get(areaName, "id", null),
        zipcodes: _.isEmpty(_.get(areaName, "zipcodes", [])) ? [] : setZipcodesInformation(_.get(areaName, "zipcodes", [])),
    }));
};
const setCitiesInformation = (cities) =>{
    if(_.isEmpty(cities) || _.isNull(cities)){
        return [];
    }

    return cities.map((city) => ({
        id: _.get(city, "id", null),
        name: _.get(city, "name", ""),
        label: _.get(city, "name", ""),
        value: _.get(city, "id", null),
        areaNames: _.isEmpty(_.get(city, "area_names", [])) ? [] : setAreaNamesInformation(_.get(city, "area_names", [])),
    }));
};
const setDistrictsInformation = (districts) =>{
    if(_.isEmpty(districts) || _.isNull(districts)){
        return [];
    }

    return districts.map((district) => ({
        id: _.get(district, "id", null),
        name: _.get(district, "name", ""),
        label: _.get(district, "name", ""),
        value: _.get(district, "id", null),
        cities: _.isEmpty(_.get(district, "cities", [])) ? [] : setCitiesInformation(_.get(district, "cities", [])),
    }));
};

const setStatesInformation = (states) =>{
    if(_.isEmpty(states) || _.isNull(states)){
        return [];
    }

    return states.map((state) => ({
        id: _.get(state, "id", null),
        name: _.get(state, "name", ""),
        label: _.get(state, "name", ""),
        value: _.get(state, "id", null),
        districts: _.isEmpty(_.get(state, "districts", [])) ? [] : setDistrictsInformation(_.get(state, "districts", [])),
    }));
} 

export { setStatesInformation };