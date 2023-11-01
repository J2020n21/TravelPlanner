import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Button, Box, Typography,FormControl, InputLabel, Select
,MenuItem
} from '@material-ui/core';
import CountryDropDown from '../components/countryDropdown.js';


const apiKey = process.env.REACT_APP_AI_API_KEY;
const apiUrl = `https://api.openai.com/v1/chat/completions`

export default function OpenAi() {
    const [mode, setMode] = useState('text') //place,route,text
    let [userPlaceChoice, setUserPlaceChoice] = useState({country:'', category:'', atmosphere:''})//for place
    let [userRouteChoice, setUserRouteChoice] = useState({country:'',theme:'',long:''})//for route: 
    const [userInput,setUserInput] = useState('');//for text
    const [aiAnswerText,setAiAnswerText] = useState(null); 
    const [aiAnswerPlace,setAiAnswerPlace] = useState(null);
    const [aiAnswerRoute,setAiAnswerRoute] = useState(null);
    const [click, setClick] = useState(0);

    let placePrompt=''; 
    let routePrompt='';

useEffect(()=>{
    if(userPlaceChoice.category != '' && userPlaceChoice.country !='' && userPlaceChoice.atmosphere !=''){
    placePrompt=`
    Recommend me 3 place of ${userPlaceChoice.category} in ${userPlaceChoice.country} atmosphere of ${userPlaceChoice.atmosphere}.
    Your answer should be clear and simple, within 100 words. 
    Give me keywords of description and lat, lng of each places.
    `;
    // console.log(placePrompt);
}

},[userPlaceChoice])

useEffect(()=>{
    if(userRouteChoice.long!=''&&userRouteChoice.country!=''&&userRouteChoice.theme!=''){
    let routePrompt=`
    Recommend me a ${userRouteChoice.long}days travel plan of ${userRouteChoice.country}, foused on the theme:${userRouteChoice.theme}.
    Your answer should be clear and simple, within 100 words. 
    Give me the reason why you recommend and lat, lng of each places.
        `;
    }
    // console.log(routePrompt);

},[userRouteChoice])


    async function callApi(prompt,setAnswer){

        const apiBody = {
            "model": "gpt-3.5-turbo",
            "messages":[{
                "role":"user",
                "content": prompt
            },],
            "temperature": 0.5,
            "max_tokens": 300,
            "frequency_penalty": 0.5,
            "presence_penalty": 0.3,
        }

        await fetch(apiUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify(apiBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);

            let answer = JSON.stringify(data.choices[0].message.content);
            setAnswer(answer);
            console.log(answer);
            console.log( typeof(answer))//string
            
        });
    }

const changeMode = () =>{
    setClick(click+1)
    if(click % 3 === 0) setMode('plan')
    else if(click % 3 === 1) setMode('place')
    else if(click % 3 === 2) setMode('text')
}

function handleChange (e, setValue,attribute=null){
    if(attribute == null){setValue(e.target.value);}
    else{
        setValue((current)=>{
            let newVal = {...current};
            newVal[attribute] = e.target.value;
            return newVal
        })}
}


  return (<>
  {/* 안내문구 */}
    <div>openAi page, mode:{mode}</div>
    <Button onClick={changeMode} variant='outlined'>Change modes</Button>
{
    mode === 'text'?
    <>
    <Typography variant="h4">Ai for Anything</Typography>
    <Box>
        <Box>
        <textarea style={{width:'100%', height:'50px'}} placeholder="ask anything to ai" onChange={e => handleChange(e,setUserInput)}/>
        <Button style={{width:'100%',marginTop:'20px'}} variant='outlined' size='small' onClick={()=>{callApi(userInput,setAiAnswerText)}}>Submit</Button>
        </Box>
        <Box bgcolor={"#E6E6E6"} style={{width:'100%',height:'200px', padding:'20px', marginTop:'10px'}}>
        {
            aiAnswerText!= null? aiAnswerText:"there's no answer"
        }
        </Box>
    </Box>
    </>
    : 
        mode === 'place'? 
        <>
        <Typography variant="h4">Ai for Places</Typography>

        <Typography variant="h6">Location?</Typography>
            <CountryDropDown setValue={setUserPlaceChoice} attribute="country"/>
                      
    <div style={{height:'20px'}}></div>
        <Typography variant="h6">What kind of place?</Typography>
            <FormControl fullWidth>
            <InputLabel id="place-category">Place</InputLabel>
            <Select
                required
                id="place-category"
                label="select place category"
                onChange={e => {handleChange(e,setUserPlaceChoice,'category')}}
            >
                <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                <MenuItem value={"Hotels"}>Hotels</MenuItem>
                <MenuItem value={"Attractions"}>Attractions</MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth>
            <InputLabel id="place-atmosphere">Atmosphere</InputLabel>
            <Select
                required
                id="place-atmosphere"
                label="select place atmosphere"
                onChange={e => {handleChange(e,setUserPlaceChoice,'atmosphere')}}
            >
                <MenuItem value={"Comfortable"}>Comfortable</MenuItem>
                <MenuItem value={"Luxary"}>Luxary</MenuItem>
                <MenuItem value={"Reasonable"}>Reasonable</MenuItem>
            </Select>
            <Button style={{width:'100%',marginTop:'20px'}} variant='outlined' size='small' onClick={()=>{callApi(placePrompt,setAiAnswerPlace)}}>Submit</Button>
            </FormControl>

        {
            aiAnswerPlace!= null? aiAnswerPlace:"there's no recommended places"
        }
    
        </>
        // recommend for plan
        :
        <>
            <Typography variant="h4">Ai for Plan</Typography> 

            <Typography variant="h6">Where do you travel?</Typography>
                <CountryDropDown setValue={setUserRouteChoice} attribute="country"/>


                <Typography variant="h6">The theme?</Typography>
                <FormControl fullWidth>
                <InputLabel id="plan-theme">Travel theme</InputLabel>
                    <Select
                        required
                        id="plan-theme"
                        label="select theme"
                        onChange={e => {handleChange(e,setUserRouteChoice,'theme')}}
                    >
                        <MenuItem value={"Relaxing"}>Relaxing</MenuItem>
                        <MenuItem value={"Sightseeing"}>Sightseeing</MenuItem>
                        <MenuItem value={"Activity"}>Activity</MenuItem>
                        <MenuItem value={"Foodie"}>Foodie</MenuItem>
                        <MenuItem value={"Art"}>Art</MenuItem>
                    </Select>
                </FormControl>   

                <Typography variant="h6">How long?</Typography>
                <FormControl fullWidth>
                <InputLabel id="plan-theme">days</InputLabel>
                    <Select
                        required
                        id="plan-theme"
                        label="select theme"
                        onChange={e => {handleChange(e,setUserRouteChoice,'long')}}
                    >
                        <MenuItem value={`1`}>1</MenuItem>
                        <MenuItem value={`2`}>2</MenuItem>
                        <MenuItem value={`3`}>3</MenuItem>
                        <MenuItem value={`4`}>4</MenuItem>
                        <MenuItem value={`5`}>5</MenuItem>
                        <MenuItem value={`6`}>6</MenuItem>
                        <MenuItem value={`7`}>7</MenuItem>
                    </Select>
                    <Button style={{width:'100%', marginTop:'20px'}} variant='outlined' size='small' onClick={()=>{callApi(routePrompt,setAiAnswerRoute)}}>Submit</Button>
                </FormControl> 

        {
            aiAnswerRoute!= null? aiAnswerRoute:"there's no recommended plan"
        }
        </>
}
    </>
  )
}
