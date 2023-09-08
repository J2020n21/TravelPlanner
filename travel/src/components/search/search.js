import React, { useState ,useEffect } from "react";
import { TextField, SelectField } from "@material-ui/core";
import axios from 'axios';
import styled from 'styled-components';

// useEffect(()=>{
//     //배경화면에 이미지를 띄운다

//     return()=>{ //clean up function (가장먼저 실행)
//         //리프레싱 할 떄 마다 랜덤 단어가 주어지므로
//         // 그걸 위해 img배열 초기화.
//         //그리고 나서 get요청을 한다
//     }});

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
