import React, { useEffect, useState } from "react";
import './../css/Counter.css'




const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds()
  };
};

export default function Counter() {

    const [diff, setDiff] = useState({});

    // next article exit
    var d = new Date();
    if ( ((2 + 7 - d.getDay()) % 7) != 0) d.setDate(d.getDate() + (2 + 7 - d.getDay()) % 7);
    else d.setDate(d.getDate() + 7);
    d.setHours(14, 0, 0)
    const futureDate = d;


    useEffect(() => {
      const timer = setInterval(() => {
        setDiff(getDateDiff(new Date(), futureDate));
      }, 1000);
      return () => clearInterval(timer);
    }, []);



    return (
        <div className="App">
            <p className="Next"> Next in:   </p>
            <p className="dy">
                {diff.day}D {diff.hour}H {diff.minute}m {diff.second}s

            </p>
        </div>
    )

}