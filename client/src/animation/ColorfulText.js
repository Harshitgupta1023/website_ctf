import React from "react";
import ReactDom from "react-dom";

import {AnimatedText} from "./AnimatedText";


function ColorfulText(props){
    return (
            <div style={{
                margin:"10% 2%"
            }}>
                <AnimatedText
                textColor="white"
                overlayColor="gold">
                    {props.text}
                </AnimatedText>
            </div>
            
    );
}

export default ColorfulText;