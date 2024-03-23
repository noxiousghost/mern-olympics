import React from "react";

function Players() {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="-mb-10 w-full flex-col justify-center space-y-5">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Top Players
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <iframe
              width="100%"
              height="1600"
              src="http://127.0.0.1:5500/frontend/src/htmlpage/players.html"
              title="players"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Players;
