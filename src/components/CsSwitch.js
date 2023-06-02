//
// eCS : Configurateur Systeme
//
// Copyright 2020 EDF All rights reserved
//

// Le composant <CustomInput type="switch"...> n'est plus dans Reactstrap 9. CsSwitch le remplace.

import React from 'react';

const CsSwitch = ({ id, checked, label, onChange, disabled }) => {
	return (
		<div className="form-check">
			<input className="form-check-input" type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled} />
			<label className="form-check-label" style={{ marginLeft: '10px', marginTop: '4px' }}>{label}</label>
		</div>
	);
}

export default CsSwitch
