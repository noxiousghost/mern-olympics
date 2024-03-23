import React from "react";
function Fixtures() {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="-mb-8 w-full flex-col justify-center space-y-5">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Fixtures
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <iframe
              width="100%"
              height="1000"
              src="http://127.0.0.1:5500/frontend/src/htmlpage/fixtures.html"
              title="GeeksforGeeks"
            ></iframe>
          </div>
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Results
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <iframe
              width="100%"
              height="1225"
              src="http://127.0.0.1:5500/frontend/src/htmlpage/results.html"
              title="results"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fixtures;
