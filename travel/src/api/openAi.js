import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Button, Box, Typography,FormControl, InputLabel, Select
,MenuItem
} from '@material-ui/core';


const apiKey = process.env.REACT_APP_AI_API_KEY;
const apiUrl = `https://api.openai.com/v1/chat/completions`

export default function OpenAi() {
    const [mode, setMode] = useState('text') //place,route,text
    const [userInput,setUserInput] = useState('');
    const [aiAnswer,setAiAnswer] = useState(null);
    const [click, setClick] = useState(0);


    async function callApi(prompt){

        const apiBody = {
            "model": "gpt-3.5-turbo",
            "messages":[{
                "role":"user",
                "content": prompt
            },],
            "temperature": 0.5,
            "max_tokens": 20,
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
            //api 요청후 응답 처리
            console.log(data);

            let answer = JSON.stringify(data.choices[0].message.content);
            setAiAnswer(answer);
            console.log(answer); //"Goodbye! Have a great day!"
            console.log( typeof(answer))//string
            
        });
    }

const changeMode = () =>{
    setClick(click+1)
    if(click % 3 === 0) setMode('plan')
    else if(click % 3 === 1) setMode('place')
    else if(click % 3 === 2) setMode('text')
}

const handleChange = (e) =>{
    setUserInput(e.target.value);
}

  return (<>
  {/* 안내문구 */}
    <div>openAi page, mode:{mode}</div>
    <Button onClick={changeMode} variant='outlined'>Change modes</Button>
{
    mode === 'text'?
    <Box>
        <Box>
        <textarea style={{width:'100%', height:'50px'}} placeholder="ask to ai" onChange={e => handleChange(e)}/>
        <Button style={{width:'100%'}} variant='outlined' size='small' onClick={()=>{callApi(userInput)}}>Submit</Button>
        </Box>
        <Box bgcolor={"#E6E6E6"} style={{width:'100%',height:'200px', padding:'20px', marginTop:'10px'}}>
        {
            aiAnswer!= null? aiAnswer:"there's no answer"
        }
        </Box>
    </Box>
    : 
        mode === 'place'? 
        <>
        <Typography variant="h4">Ai for Places</Typography>

        <Typography variant="h6">Location?</Typography>
        {/* 콤보박스/드롭박스 스크롤 고려해보기 */}
            <FormControl fullWidth>
            <InputLabel id="place-category">Place</InputLabel>
            <Select
                id="id"
                label="label"
            >
                <MenuItem value={"Korea"}>Korea</MenuItem>
                <MenuItem value={"France"}>Frace</MenuItem>
            </Select>
            </FormControl>
<div style={{height:'20px'}}></div>
        <Typography variant="h6">What kind of place?</Typography>
            <FormControl fullWidth>
            <InputLabel id="place-category">Place</InputLabel>
            <Select
                id="id"
                label="label"
            >
                <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                <MenuItem value={"Hotels"}>Hotels</MenuItem>
                <MenuItem value={"Attractions"}>Attractions</MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth>
            <InputLabel id="place-atmosphere">Atmosphere</InputLabel>
            <Select
                id="id2"
                label="label"
            >
                <MenuItem value={"Comfortable"}>Comfortable</MenuItem>
                <MenuItem value={"Luxary"}>Luxary</MenuItem>
                <MenuItem value={"Reasonable"}>Reasonable</MenuItem>
            </Select>
            </FormControl>
    
        </>
        :
            <div>plan</div>
}
    </>
  )
}
