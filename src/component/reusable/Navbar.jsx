import React, { useState, useEffect } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Image,
  Container,
  Col,
  Dropdown,
  ListGroup,
  Badge,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";

import Modal from "./Modals";

import { movie } from "../../database/db";

import UserModal from "./UserModals";

import Logo from "../../images/Logo.svg";

import {
  AiOutlinePoweroff,
  AiOutlineDropbox,
  AiOutlineEdit,
} from "react-icons/ai";

export default function Bar(props) {
  const [isLogin, setLogin] = useState(false);

  const [userData, setData] = useState(
    JSON.parse(localStorage.getItem("userdata")) || { name: "", image: "" }
  );

  const [searchCondition, setSearch] = useState({
    focus: false,
    change: false,
    selected: false,
  });

  const [searchData, setSearchData] = useState();

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      style={{ marginBottom: 0 }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </p>
  ));

  const [show, setShow] = useState(false);
  const item = {
    poster: "",
    id: "",
  };

  const [showUserModal, setUserModal] = useState(false);

  const closeModal = () => {
    setShow(false);
    setLogin(true);
    setData(JSON.parse(localStorage.getItem("userdata")));
  };

  const handleModal = () => {
    setShow(!show);
  };

  const handleUserModal = () => {
    setUserModal(!showUserModal);
  };

  const userModal = () => {
    setUserModal(!showUserModal);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLogin(false);
  };

  const searchMovie = (e) => {
    setSearch({ ...searchCondition, change: true });
    movie("search", e.target.value).then((res) => {
      setSearchData(res.data.splice(0, 5));
    });
  };

  let history = useHistory();
  useEffect(() => {
    return () => {
      console.log(history)
    }
  }, [history])


  const onClickDetail = (id) => {
    history.replace({
      pathname: `/Le-Movie/detail/${id}/Overview/`,
      state: { id },
    });
    localStorage.setItem("pageid", id);
  };

  useEffect(() => {
    localStorage.getItem("token") && setLogin(true);
  }, [isLogin]);

  return (
    <Navbar bg="white" expand="lg">
      <Modal show={show} handleModal={handleModal} closeModal={closeModal} />
      <UserModal show={showUserModal} handle={handleUserModal} />
      <Container style={{ maxWidth: "100vw" }}>
        <Col xs lg="4" className="justify-content-start text-left">
          <Navbar.Brand href="#home">
            <Image style={{ width: "200px" }} src={Logo} />
          </Navbar.Brand>
        </Col>
        <Col xs lg="6">
          <Form>
            <FormControl
              type="text"
              onFocus={() =>
                setSearch({
                  ...searchCondition,
                  focus: true,
                })
              }
              onBlur={() =>
                setSearch({
                  ...searchCondition,
                  focus: false,
                })
              }
              onChange={(e) => searchMovie(e)}
              placeholder="Search"
              className="mr-sm-2"
            />
          </Form>
        </Col>
        {((searchCondition.change && searchCondition.focus) ||
          (searchCondition.change && searchCondition.selected)) && (
          <ListGroup
            className="position-absolute mt-1 w-75"
            style={{ top: "76px", left: "12.5vw", zIndex: "999" }}
            onMouseEnter={() =>
              setSearch({
                ...searchCondition,
                selected: true,
              })
            }
            onMouseLeave={() => setSearch({
              ...searchCondition,
              selected: false,
            })}
          >
            {searchData &&
              searchData.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center p-1"
                  onClick={() => onClickDetail(item.title)}
                >
                  <Image
                    // style={{ width: "150px", height: "225px" }}
                    width={40}
                    height={60}
                    id={item.id}
                    src={
                      item.poster.match(/^(http|https):/)
                        ? `${item.poster}`
                        : item.poster.length !== 18
                        ? `https://warm-bastion-18573.herokuapp.com${item.poster}`
                        : `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"500"%20height%3D"750"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2050%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"50"%20height%3D"75"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"6"%20y%3D"45">Poster<%2Ftext><%2Fg><%2Fg><%2Fsvg>`
                    }
                    alt={`poster`}
                  />
                  <label className="text-dark">{item.title}</label>
                  <Badge style={{ fontSize: "1.5rem" }} variant="warning mr-4">
                    {item.rating}
                  </Badge>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
        <Col xs lg="2" className="justify-content-end text-right">
          {!isLogin ? (
            <p style={{ marginBottom: 0 }} onClick={handleModal}>
              Sign Up
            </p>
          ) : (
            <>
              <Dropdown style={{ cursor: "pointer" }}>
                <Dropdown.Toggle
                  drop={"left"}
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  <Navbar.Text className={"mr-3"}>{userData.name}</Navbar.Text>
                  <Image
                    style={{ width: "50px", height: "50px" }}
                    src={`https://warm-bastion-18573.herokuapp.com/${userData.image}`}
                    roundedCircle
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={userModal} href="#/edit">
                    <AiOutlineEdit />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={userModal} href="#/delete">
                    <AiOutlineDropbox />
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogOut} href="#/delete">
                    <AiOutlinePoweroff />
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </Col>
      </Container>
    </Navbar>
  );
}
