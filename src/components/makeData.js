

export default function makeData() {

  return Array(1000).fill({}).map((e,i) => ({
    col0: '',
    col1: 'Hello ' + i.toString(),
    col2: 'un',
    col3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',


  }));

}
