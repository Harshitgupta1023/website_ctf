import React from "react";
import ReactDom from "react-dom";

import {AnimatedText} from "./AnimatedText";


function App(){
    return (
            <div style={{
                margin:"10% 2%"
            }}>
                <AnimatedText
                textColor="white"
                overlayColor="gold">
                    SeekhoCTF
                </AnimatedText>
            </div>
            
    );
}

export default App;