import React, { Component, useState } from "react";

const Complain = ()=>{
    return(       
    <div>
        <h2>Is there any problem?</h2>
        <p>`
            Please write your problem below.
            Sorry for your inconvenience.
            `</p>
        <textarea placeholder="Here"></textarea>
        <button>Send</button>
    </div>
    )
}

export default Complain