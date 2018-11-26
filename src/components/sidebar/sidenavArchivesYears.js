import React from "react";

const sidenavArchievesYears = ({year}) => {
  //console.log(year)
  return (
    <thead>
        <tr>
        <th>
          <div className="th-archive">{year}</div>
        </th>
      </tr>
    </thead>
  );
};

export default sidenavArchievesYears;
