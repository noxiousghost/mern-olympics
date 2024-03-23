import React from "react";

function TablePoint() {
  return (
    <div>
      <div className="w-full flex flex-col -mb-8">
        <div className="w-full flex-col justify-center space-y-5 ">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              Medals
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <iframe
              width="100%"
              height="950"
              src="http://127.0.0.1:5500/frontend/src/htmlpage/table-point.html"
              title="players"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TablePoint;
