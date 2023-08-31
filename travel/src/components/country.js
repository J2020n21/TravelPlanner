import React, { Component } from 'react'

import { ReactCountryDropdown } from 'react-country-dropdown'
import 'react-country-dropdown/dist/index.css'

const CountryDropDown = () => {
  const handleSelect = (country) => {
    console.log(country)
    /* returns the details on selected country as an object
    	{
          name: "United States of America", 
          code: "US", 
          capital: "Washington, D.C.", 
          region: "Americas", 
          latlng: [38, -97]
        }
    */
  }
  return (
    <div>
      <ReactCountryDropdown onSelect={handleSelect} countryCode='IN' />
    </div>
  )
}

const Date = () => {

    return(
        <input type="text" placeholder='7Days'></input>
    )

}

const Recommendation = () => {

    return(
        <input type="text" placeholder='Yes'></input>
    )
// Input tag to DB
}

export {CountryDropDown, Date, Recommendation}