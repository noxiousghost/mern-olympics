import React from "react";
import { Link } from "react-router-dom";

function Lives() {
  return (
    <div>
      Live Games <br />
      <Link to="/live">Football</Link>
    </div>
  );
}

export default Lives;
