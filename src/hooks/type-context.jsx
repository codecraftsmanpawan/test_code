import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import typeReducer from './typeReducer'
import GetInfluencers from '../GetDataFunctions/GetInfluencers'
import { baseURL } from './config'


const TypeContext = createContext()
const TypeProvider = ({ children }) => {



    const influencers = GetInfluencers(`${baseURL}/restricted/influencers`)

    useEffect(() => {
        influencers?.data &&
            typeDispatch({
                type: 'INITIAL_INFLUENCERS',
                payload: influencers.data
            })
    }, [influencers?.data])


    // "Lifestyle", "Fashion", "Beauty", "Travel", "Health Fitness", "Food Drink",
    //     "Model", "Comedy Entertainment", "Art Photography", "Music Dance", "Entr Business",
    //     "Family Children", "Animals Pets", "Athlete Sports", "Adventure Outdoors", "Education",
    //     "Celebritypf", "Gaming", "Actor", "Technology", "LGBTQ2", "Healthcare",
    //     "Vegan", "Cannabis", "Skilled Trades", "Automotive"




    //  
    //     "Celebritypf", "Gaming", "Actor", ", "LGBTQ2", "Healthcare",
    //     "Vegan", "Cannabis", "Skilled Trades", "Automotive"

    const [typeState, typeDispatch] = useReducer(typeReducer, {
        allInfluencers: [],
        niches: {
            fashion: false,
            health_and_fittness: false,
            beauty: false,
            mob_baby: false,
            travel: false,
            food_and_drink: false,
            model: false,
            lifestyle: false,
            automobiles_car_and_bike: false,
            entertainment: false,
            technology: false,
            electronic_gadgets: false,
            home_decor: false,
            art_photography: false,
            music_dance: false,
            entr_business: false,
            family_children: false,
            animals_pets: false,
            athlete_sports: false,
            adventure_outdoors: false,
            education: false,
            celebritypf: false,
            gaming: false,
            actor: false,
            healthcare: false,
            vegan: false,
            cannabis: false,
            skilled_trades: false,
            automotive: false
        },
        channel: {
            youtube: false,
            instagram: false,
            facebook: false,
            twitter: false
        },

        filteredData: []
    })







    return <TypeContext.Provider value={{ typeState, typeDispatch }}>{children}</TypeContext.Provider>
}

const useType = () => useContext(TypeContext)

export { TypeProvider, useType }