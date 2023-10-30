import React, { useState ,useEffect } from "react";
import { TextField, SelectField } from "@material-ui/core";
import axios from 'axios';
import styled from 'styled-components';

//'sky','ocean','airplane',

const Search = () =>{
    const apiKey='36162160-9ad290b2b95fe84e106ba7a08';
    let randomNumber_20 = Math.floor(Math.random()*21);
    // let searchTextKeywords = Math.random(['sky','ocean','airplane']);
    let searchText = 'sky';
    let [imageURL, setImage] = useState([]);
    let searchStates = {
        searchText: searchText,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '36162160-9ad290b2b95fe84e106ba7a08',
        images: []
    };


    useEffect(()=>{

        //get req
        axios.get(`https://pixabay.com/api/?key=${searchStates.apiKey}&q=${searchStates.searchText}&image_type=photo&safesearch=true`)
        .then((res) => {
            console.log(res.data.hits);
            let largeImage = res.data.hits[randomNumber_20].largeImageURL;
            let image = res.data.hits[randomNumber_20].imageURL;
            {largeImage? setImage(largeImage): setImage(image)}
            setImage(res.data.hits[randomNumber_20].largeImageURL);
        })
        .catch(err => console.log(err));

    },[])


    return(
        <>
            <div style={{
                backgroundImage: `url(${imageURL})`,
                backgroundSize: 'cover',
                // 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
            }}></div>
        </>
    );
  }

export default Search;
