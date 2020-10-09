import React, { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { getMovieCast } from "../../database/db";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function Characters() {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(1)

  const MenuItem = ({ text, selected }) => {
    return <div className={`menu-item ${selected ? 'active' : ''}`}>{text}</div>;
  };
  
  const Menu = (list, selected) =>
  list.map(el => {
    const { character, cast_id } = el;
    const onClick = () => console.log('original onClick ', character);
    return (
      <MenuItem text={character} key={cast_id} selected={selected} onClick={onClick} />
    );
  });

  const ArrowLeft = () => {
    return <IoIosArrowDropleft />;
  };

  const ArrowRight = () => {
    return <IoIosArrowDropright />;
  };

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

  const onSelect = key => {

  }
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
