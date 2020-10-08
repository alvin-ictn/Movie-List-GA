import React, { useState, useEffect } from 'react'
import {getMovieCast} from '../../database/db'

export default function Characters() {
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setError(false)
            setLoading(true)
            
            try{
                const result = await getMovieCast()
                setCast(result.cast)
                setCrew(result.crew)
            } catch(error){
                setError(true)
            }

            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <section className="credits">
            <div className="credits--cast">
                {isLoading && <p>LOADING NOW DUDEK</p>}
                {console.log(cast)}
                {cast.length && cast.map(item=> (<p>{item.character}</p>))}
            </div>
        </section>
    )
}
