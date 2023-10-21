import axios from 'axios';
// for location based recommendation

const getPlacesData = async(type, sw, ne) => {
    try{ //bounds.sw.lat
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            restaurant_tagcategory_standalone: '10591',
            restaurant_tagcategory: '10591',
            limit: '30',
            currency: 'USD',
            open_now: 'false',
            lunit: 'km',
            lang: 'en_US'
          },
          headers: {
            'X-RapidAPI-Key': 'b75da5d501msh763990eebb2c50fp169b86jsn0e14c5ff690c',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        
        return data;
    } catch(error){
        console.log("place api request err: "+error);
    }
}

export {getPlacesData}