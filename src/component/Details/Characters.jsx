import React, { useState, useEffect } from 'react'
import { Card, Image } from 'react-bootstrap';
import {getMovieCast} from '../../database/db'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { IoIosArrowDropleft, IoIosArrowDropright} from 'react-icons/io'
export default function Characters() {
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    const ArrowLeft = () => {
        return <IoIosArrowDropleft/>
    }
    
    const ArrowRight = () => {
        return <IoIosArrowDropright/>
    }

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
                //cast.map(item=> (<p key={item.id}>{item.character}</p>))
    return (
        <section className="credits">
            <div className="credits--cast">
                {isError && <div>Something went wrong ...</div>}
                {isLoading ? <p>LOADING NOW DUDEK</p> : cast.length && 
                    
                    <ScrollMenu data={cast}/>
                }

            </div>
        </section>
    )
}
