import fetch from "cross-fetch";

// 'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B"areaName":"areaName","date":"date","newCasesBySpecimenDate":"newCasesByPublishDate"%7D' \

const base = "https://api.coronavirus.data.gov.uk/v1/data";

export const getData = (xAxisDim, yAxisDim) => {
  const filterString = "filters=areaType=overview";
  const structure = {
    areaName: "areaName",
    date: "date",
    newAdmissions: xAxisDim,
    covidOccupiedMVBeds: yAxisDim,
  };
  const structureString = `structure=${encodeURI(JSON.stringify(structure))}`;

  const url = `${base}?${filterString}&${structureString}`;

  console.log("url:", url);

  return fetch(url).then((res) => res.json());
};
