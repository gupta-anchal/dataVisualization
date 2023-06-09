import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import WineData from "./../wineData.json";

const BarChart = () => {
  const [barOption, setBarOption] = useState({}); //Store the details about the bar chart

  useEffect(() => {
    getDataForBarChart(); //Function to be invoked when the component loads for the fisrt time
  }, []);

  const getDataForBarChart = () => {
    let avgMalicAcid = [];
    const unique = [...new Set(WineData.map((item) => item.Alcohol))]; //fetch all the unique categories of Alcohol present in the data set
    unique.map((alcoholType) => {
      let sum = 0;
      sum = WineData.filter((WineData) => WineData.Alcohol === alcoholType) //Filter the records with each category of Alcohol
        .map((WineData) => WineData.Malic_Acid)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0); //Calculates the sum of Malic Acid from the filtered data

      let avg =
        sum /
        WineData.filter((WineData) => WineData.Alcohol === alcoholType).length; //Calculates the average of Malic Acid
      return avgMalicAcid.push(Number(avg.toFixed(2))); //Save the average of each category in an array
    });
    let tempBarOption = {
      //Setup for all the details required for the implementation of Bar Chart from ECharts.
      xAxis: {
        data: unique,
        type: "category",
        name: "Alcohol",
      },
      yAxis: {
        type: "value",
        name: "Malic Acid",
      },
      series: [
        {
          data: avgMalicAcid,
          type: "bar",
        },
      ],
    };
    setBarOption(tempBarOption); //Updating state of BarOption
  };

  return <ReactEcharts option={barOption} />; //Rendering the Bar Chart
};

export default BarChart;
