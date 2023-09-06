import React, { Component } from "react";
import { TextField, SelectField } from "@material-ui/core";
import axios from 'axios';
import imageReaults from '../imageResults/imageResult.js';


const Search = () =>{
    const apiKey='36162160-9ad290b2b95fe84e106ba7a08';
    let searchStates = {
        searchText: '',
        amount: 3,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '36162160-9ad290b2b95fe84e106ba7a08',
        images: []
    };


   
        axios.get('https://pixabay.com/api/?key=36162160-9ad290b2b95fe84e106ba7a08&q=sky&image_type=photo&safesearch=true')
        .then(res => console.log(res.data.hits[0].pageURL))
        .catch(err => console.log(err));
    

    return(
        <div>
            return
        </div>
    );
  }

//   https://velog.io/@solmii/React%EC%9D%98-%ED%95%A8%EC%88%98%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-feat.Hooks

export default Search;
