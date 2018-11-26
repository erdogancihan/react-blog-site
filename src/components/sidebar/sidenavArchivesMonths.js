import React, { Component } from "react";
import moment from "moment";

class sidenavArchievesMonths extends Component {
  render() {
    const { month, year, handleShowArticle, monthsCount, strings } = this.props;
    if (strings.language === "tr") {
      moment.locale("tr");
    } else if (strings.language === "en") {
      moment.locale("en-gb");
    } else if (strings.language === "de") {
      moment.locale("de");
    }

    const monthOfYear = moment(month + 1, "MM").format("MMMM");

    let count;
    monthsCount &&
      monthsCount.map(Month => {
        if (Object.keys(Month)[0] === year + "/" + month) {
          return (count = Object.values(Month)[0]);
        }
        return null;
      });
    return (
      <tbody>
        <tr>
          <td>
            <div
              className="td-archive"
              onClick={() => {
                handleShowArticle(year + "/" + month);
              }}
            >
              {monthOfYear + " (" + count + ")"}
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default sidenavArchievesMonths;
