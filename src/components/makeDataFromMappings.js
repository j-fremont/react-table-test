
const data = require('./mappings_1.json');

export default function makeData() {

  return data.map(d => ({
    name: d.name,
    description: d.description,




  }));

}
