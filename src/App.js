import React, { Component } from 'react';

import CsPageTableContainer from './components/CsPageTableContainer'
import CsExpandTableContainer from './components/CsExpandTableContainer'
import CsResizeTableContainer from './components/CsResizeTableContainer'
import CsTableContainer from './components/CsTableContainer'

import './App.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<CsTableContainer />
			</React.Fragment>
		);
	}
}

export default App;
