import _ from "lodash";

const setZipcodesInformation = (zipcodes) =>{
    if(_.isEmpty(zipcodes) || _.isNull(zipcodes)){
        return [];
    }

    const mappedZipcodes = _.map(zipcodes, (zipcode) => ({
        id: _.get(zipcode, "id", null),
        zipcode: _.get(zipcode, "zipcode", ""),
        label: _.get(zipcode, "zipcode", ""),
        value: _.get(zipcode, "id", null),
    }));

    return _.sortBy(mappedZipcodes, 'zipcode');
};

const setAreaNamesInformation = (areaNames) =>{
    if(_.isEmpty(areaNames) || _.isNull(areaNames)){
        return [];
    }

    const mappedAreaNames = _.map(areaNames, (areaName) => ({
        id: _.get(areaName, "id", null),
        name: _.get(areaName, "name", ""),
        label: _.get(areaName, "name", ""),
        value: _.get(areaName, "id", null),
        zipcodes: _.isEmpty(_.get(areaName, "zipcodes", [])) ? [] : setZipcodesInformation(_.get(areaName, "zipcodes", [])),
    }));

    return _.sortBy(mappedAreaNames, 'name');
};
const setCitiesInformation = (cities) =>{
    if(_.isEmpty(cities) || _.isNull(cities)){
        return [];
    }

    const mappedCities = _.map(cities, (city) => ({
        id: _.get(city, "id", null),
        name: _.get(city, "name", ""),
        label: _.get(city, "name", ""),
        value: _.get(city, "id", null),
        areaNames: _.isEmpty(_.get(city, "area_names", [])) ? [] : setAreaNamesInformation(_.get(city, "area_names", [])),
    }));

    return _.sortBy(mappedCities, 'name');
};
const setDistrictsInformation = (districts) =>{
    if(_.isEmpty(districts) || _.isNull(districts)){
        return [];
    }

    const mappedDistricts = _.map(districts, (district) => ({
        id: _.get(district, "id", null),
        name: _.get(district, "name", ""),
        label: _.get(district, "name", ""),
        value: _.get(district, "id", null),
        cities: _.isEmpty(_.get(district, "cities", [])) ? [] : setCitiesInformation(_.get(district, "cities", [])),
    }));

    return _.sortBy(mappedDistricts, 'name');
};

const setStatesInformation = (states) =>{
    if(_.isEmpty(states) || _.isNull(states)){
        return [];
    }

    const mappedStates = _.map(states, (state) => ({
        id: _.get(state, "id", null),
        name: _.startCase(_.get(state, "name", "")),
        label: _.get(state, "name", ""),
        value: _.get(state, "id", null),
        districts: _.isEmpty(_.get(state, "districts", [])) ? [] : setDistrictsInformation(_.get(state, "districts", [])),
        districtsCount: _.get(state, "district_count", 0),
    }));

    return _.sortBy(mappedStates, 'name');
} 

export { setStatesInformation };