import React from "react"

import {faCheck, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CheckBox = (props) => {
    if (props.checked) {
        return <FontAwesomeIcon icon={faCheck}/>
    } else {
        return <FontAwesomeIcon icon={faArrowRight}/>
    }
}

export default CheckBox