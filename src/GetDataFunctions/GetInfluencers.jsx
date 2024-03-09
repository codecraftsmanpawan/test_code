import axios from 'axios'
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import typeReducer from '../hooks/typeReducer';




const GetInfluencers = (url) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [influencers, setInfluencers] = useState()

    const [error, setError] = useState()

    useEffect(() => {

        setTimeout(() => {


            const getData = async () => {

                try {
                    const res = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token.idToken}`
                        }

                    })
                    if (res.status === 200) {
                        setInfluencers(res)
                    }



                }
                catch (error) {
                    setError(error);
                }
            }; getData()

        }, 100);

    }, [url])
    return influencers

}

export default GetInfluencers


