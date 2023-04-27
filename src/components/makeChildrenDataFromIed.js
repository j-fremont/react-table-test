
import { forceString } from '../helper'

const data = require('./ied_1.json');

export default function makeData() {

  const getLogicalAttributes = (data) => {

    return data.dataAttribute && data.dataAttribute.length ? data.dataAttribute.map(a => ({
      data: {
        name: forceString(a.name),
        fc: forceString(a.fc),
        btype: forceString(a.btype),
        valKind: forceString(a.valKind),
        description: forceString(a.description),
        type: 'DA',
        activated: true,

      },
      children: getLogicalAttributes(a),

    })) : [];

  }

  const getDataObjects = (data) => {

    return data.dataObject && data.dataObject.length ? data.dataObject.map(o => ({
      data: {
        name: forceString(o.name),
        cdc: forceString(o.cdc),
        type: forceString(o.type),
        category: forceString(o.category),
        description: forceString(o.description),
        type: 'DO',
        activated: true,

      },
      children: [...getDataObjects(o), ...getLogicalAttributes(o)],

    })) : [];

  }

  const getLogicalNodes = (data) => {

    return data.ln && data.ln.length ? data.ln.map(n => ({
      data: {
        name: forceString(n.lnClass),
        lnClass: forceString(n.lnClass),
        lnInst: forceString(n.lnInst),
        lnType: forceString(n.lnType),
        prefix: forceString(n.prefix),
        description: forceString(n.description),
        type: 'L_NODE',
        activated: true,

      },
      children: getDataObjects(n),

    })) : [];

  }

  return data.ldevice.map(d => ({
    data: {
      name: forceString(d.ldInst),
      ldInst: forceString(d.ldInst),
      description: forceString(d.description),
      type: 'L_DEVICE',
      activated: false,

    },
    children: getLogicalNodes(d),

  }));

}
