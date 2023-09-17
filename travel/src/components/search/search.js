import React, { useState ,useEffect } from "react";
import { TextField, SelectField } from "@material-ui/core";
import axios from 'axios';
import styled from 'styled-components';

const Search = () =>{
    const apiKey='36162160-9ad290b2b95fe84e106ba7a08';
    let [imageURL, setImage] = useState([]);
    let searchStates = {
        searchText: 'sky', //need to randomize
        amount: 3,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '36162160-9ad290b2b95fe84e106ba7a08',
        images: []
    };

    //get req
    axios.get(`https://pixabay.com/api/?key=${searchStates.apiKey}&q=sky&image_type=photo&safesearch=true`)
    .then((res) => {
        console.log(res.data.hits);
        setImage(res.data.hits[0].largeImageURL);
        console.log('imageURL0='+imageURL);
    })
    .catch(err => console.log(err));
            

    return(
        <>
            <div style={{
                backgroundImage: `url(${imageURL})`,
                backgroundSize: 'cover',
                height: '500px',
                width: '500px'
            }}></div>
        </>
    );
  }

export default Search;
