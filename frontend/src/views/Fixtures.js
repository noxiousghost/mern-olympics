import React from "react";
function Fixtures() {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="-mb-8 w-full flex-col justify-center space-y-5">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Upcoming Fixtures
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">fixtures</div>
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Results
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">Result</div>
        </div>
      </div>
    </div>
  );
}

export default Fixtures;
