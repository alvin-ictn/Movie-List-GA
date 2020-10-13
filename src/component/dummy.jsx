import React, { Component } from "react";
import Header from "./Header";
import { movie } from '../database/db'
export default class dummy extends Component {
  state = {
    results : []
  };

  componentDidMount() {
    movie("detail").then(res =>{
        let results = [...res.data]
        console.log(results)
        this.setState({results})
      }
    )
  }

  componentDidUpdate() {
    console.log(this)
  }

   onClickDetail = (id) => {
    this.props.history.push({
      pathname: `/Le-Movie/detail/${id}/overview`,
      state: { id },
    });
    localStorage.setItem("pageid", id);
  };


  render() {
    return (
      <div>
        <Header img={this.state.results[0] && this.state.results[0].backdrop} />
        {this.state.results.map((item) => (
          <img width={150}
          onClick={() => this.onClickDetail(item.title)}
          id={item.id}
          key={item.id}
          src={item.poster ? `${item.poster}` : `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"500"%20height%3D"750"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2050%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"50"%20height%3D"75"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"6"%20y%3D"45">Poster<%2Ftext><%2Fg><%2Fg><%2Fsvg>`}
          alt={item.original_title}
        />
        ))}
      </div>
    );
  }
}
