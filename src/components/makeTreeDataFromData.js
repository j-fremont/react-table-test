
const data = require('./data_1.json');

export default function makeData() {

  const getProperty = (objectWithProperties, propertyName) => {
  	const property = objectWithProperties && objectWithProperties.properties && objectWithProperties.properties.find(p => p.name===propertyName);
  	return property ? property.value : null;
  }

  const getData = (data) => {

    return {
      data: {
        name: data.name,
        description: data.description,
        prefix: getProperty(data, 'prefix'),
        lnInst: getProperty(data, 'lnInst'),
        test: data.name.startsWith('SS') ? ('Test' + data.name) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',


      }


    }


  }

  const getChildren = (data) => {



    return data.isContained.map(c => ({
      ...getData(c),
      children: getChildren(c)


    }));

  }



  return [{
    ...getData(data),
    children: getChildren(data)


  }]


}
