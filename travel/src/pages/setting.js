import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting = () =>{
    const navigate = useNavigate();
    let sets = ['AI recommend','Reset the plan','Auto-save'];
    let setsDes = ['Use AI recommendation','All the plan will be removed',
        'Your plan will be saved automatically']
    let [setsValue,changeSetsValue] = useState([0,0,0]);

    return(
        
        <>     
        {
            sets.map(function(data,i){
                return(
                    <div className="Set">
                    <h2>{data}</h2>
                    <p>{setsDes[i]}</p>
                    </div>
                )
            })
        }

        <h5>Any problem?</h5>
        <p onClick={()=>{navigate('/home/complain')}}>click</p>
        </>
    )

}

export default Setting