import { groupBy, sumBy } from "lodash";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "../App.css";

function Statistics() {
  const [trainings, setTrainings] = useState([{ duration: "", name: "" }]);
  const [checkready, setCheckReady] = useState(false);
  const [data, setData] = useState([]);

  let trainingsArray = [];

  const COLORS = [
    "#52D726",
    "#FFEC00",
    "#FF7300",
    "#FF0000",
    "#007ED6",
    "#7CDDDD",
    "#323232",
  ];

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data.content);
        setCheckReady(true);
      })
      .catch((err) => console.error(err));
  };

  if (checkready) {
    let myTrainings = {};
    let grouppedObject = groupBy(trainings, "activity");
    for (let item in grouppedObject) {
      myTrainings = {
        activity: item,
        Duration: sumBy(grouppedObject[item], "duration"),
      };
      trainingsArray.push(myTrainings);
    }
    setData(trainingsArray);
    setCheckReady(false);
    console.log(data);
    console.log(checkready);
    console.log(trainings);
  }

  return (
    <div>
      <div>
        <BarChart width={800} height={400} data={data}>
          <XAxis dataKey="activity" stroke="#8884d8" />
          <YAxis />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#333",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <Tooltip wrapperStyle={{ width: 120, backgroundColor: "#333" }} />
          <Bar dataKey="Duration" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
      <div id="PieChart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Legend layout="vertical" verticalAlign="middle" align="right" />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={"activity"}
              outerRadius={80}
              fill="#8884d8"
              dataKey="Duration"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Statistics;