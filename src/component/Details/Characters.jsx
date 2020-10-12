import React, { useState, useEffect } from "react";
// import { Card, Image } from "react-bootstrap";
import { getMovieCast } from "../../database/db";

export default function Characters() {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [list, setList] = useState([]);
  const [selected] = useState(1)

  console.log(crew,selected)

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const result = await getMovieCast();
        setCast(result.cast);
        setCrew(result.crew);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
      console.log(cast)
    let data = cast.map((item) => <div key={item.cast_id}>{item.character}</div>);
    setList(data);
    console.log(data)
  }, [cast]);

  //cast.map(item=> (<p key={item.id}>{item.character}</p>))
  return (
    <section className="credits">
      <div className="credits--cast">
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <p>LOADING NOW DUDEK</p>
        ) : (
          cast.length && (
            <div>
                {list.map(item=>item)}
              {/* <ScrollMenu
                data={list}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
              /> */}
            </div>
          )
        )}
      </div>
    </section>
  );
}
