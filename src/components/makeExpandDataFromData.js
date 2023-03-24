
const data = require('./data_1.json');

export default function makeData() {

  const getProperty = (objectWithProperties, propertyName) => {
  	const property = objectWithProperties && objectWithProperties.properties && objectWithProperties.properties.find(p => p.name===propertyName);
  	return property ? property.value : null;
  }

  const getDetails = (data) => {

    return {
      name: data.name,
      description: data.description,
      prefix: getProperty(data, 'prefix'),
      lnInst: getProperty(data, 'lnInst'),

    }


  }

  const subRows = (data) => {



    return data.isContained.map(c => ({
      ...getDetails(c),
      subRows: subRows(c)


    }));

  }



  return [{
    ...getDetails(data),
    subRows: subRows(data)


  }]


}
