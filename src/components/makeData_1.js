
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



/*
  return [{
    name: electrotechObject.name,
			scltype: electrotechObject.scltype,
			parent: null,
			activated,
			enabled: true
		},
		subRows: subRows(electrotechObject, true)
	}];

*/


  /*




  return Array(1000).fill({}).map((e,i) => ({
    col0: '',
    col1: 'Hello ' + i.toString(),
    col2: 'un',
    col3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',


  }));

*/

}
