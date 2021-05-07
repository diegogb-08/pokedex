import React, { useState } from 'react'

const ProgressBar = ({done}) => {

    const [style, setStyle] = useState({});

    setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 1);

    return (
        <div className="progressComponent">
			<div className="progressDone" style={style}></div>
		</div>
    )
}

export default ProgressBar
