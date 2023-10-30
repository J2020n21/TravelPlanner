import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Button, } from '@material-ui/core';


const apiKey = process.env.REACT_APP_AI_API_KEY;
const apiUrl = `https://api.openai.com/v1/chat/completions`

export default function OpenAi() {
    const [userInput,setUserInput] = useState('');
    const [aiAnswer,setAiAnswer] = useState('');
    const [click, setClick] = useState(0);

    let prompt = '';
    // "Good bye";
  
    const aiRequest = () =>{
        //클릭증가, useEffect 발동
        console.log('clicked')
        setClick(click+1)
    }

    async function callApi(prompt){

        const apiBody = {
            "model": "gpt-3.5-turbo",
            "messages":[{
                "role":"user",
                "content": prompt
            },],
            "temperature": 0.5,
            "max_tokens": 10,
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

const handleChange = (e) =>{
    setUserInput(e.target.value);
}

  return (<>
    <div>openAi page, result:</div>
    <textarea placeholder="ask to ai" onChange={e => handleChange(e)}/>

    <Button variant='outlined' size='small' onClick={()=>{callApi(userInput)}}>Submit</Button>
    
    {
        aiAnswer!= null? aiAnswer:"there's no answer"
    }
    </>
  )
}
