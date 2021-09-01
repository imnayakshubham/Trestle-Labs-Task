import React from "react";
import "./Error.css";

function Error() {
  return (
    <div className="errormain">
      <div className="card">
        <h1 className="errortext">
          "You cannot have this website open in multiple tabs.
          <p>Please close them until there is only one remaining. Thanks!"</p>
        </h1>
      </div>
    </div>
  );
}

export default Error;
