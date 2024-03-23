import React from "react";
import { Link } from "react-router-dom";

function Lives() {
  return (
    <div>
      <div className="w-full flex flex-col -mb-8">
        <div className="w-full flex-col justify-center space-y-5 ">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Watch Live Events
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <Link
              to="/live"
              style={{
                zIndex: "1",
                display: "block",
                position: "absolute",
                marginLeft: "1148px",
                marginTop: "82px",
                color: "transparent",
              }}
            >
              watch
            </Link>
            <iframe
              width="100%"
              height="529"
              src="http://127.0.0.1:5500/frontend/src/htmlpage/lives.html"
              title="players"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lives;
