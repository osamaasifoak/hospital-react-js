import React from "react";
import axios from "axios";
import AppHeaderComponent from "../components/AppHeaderComponent";
import HeaderItemsConstant from "../constants/HeaderItemsConstant";
var xml2js = require("xml2js");

const HomeView = () => {
  const [loadedXML, setLoadedXML] = React.useState();
  const [tabIndex, setTabIndex] = React.useState(0);
  async function loadXML(xml, index) {
    var response = await axios.get(xml, {
      "Content-Type": "application/xml; charset=utf-8",
    });
    // console.log("AXIOS RESPONSE\n", response.data);
    let parser = new xml2js.Parser();
    parser.parseString(response.data, function (err, result) {
      console.log(result);
      setLoadedXML(result);
      setTabIndex(index);
    });
    return response.data;
  }

  return (
    <>
      {
      loadedXML !== undefined?
      loadedXML.patients.patient.map((x) => {
        console.log(x);
      }):null}
      <div style={{ flex: 1 }}>
        {/* {AppHeaderComponent(loadXML)} */}
        <AppHeaderComponent onClickItems={loadXML} />
        <div style={{ backgroundColor: "#ffffff", flex: 1, marginTop: 20}}>
          <div
            style={{
              alignItems:"center",
              justifyContent:"center",
              flex: 1,
              padding:10
            }}
          >
            <text>{HeaderItemsConstant[0].name}</text>
          </div>
          <table className="table" style={{ marginTop: 10 }}>
            <thead className="head-light">
              <tr
                style={{
                  backgroundColor: "#191970",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <th scope="col">dob</th>
                <th scope="col">fName</th>
                <th scope="col">fileNo</th>
                <th scope="col">gender</th>
                <th scope="col">lName</th>
              </tr>
            </thead>
            <tbody >
              { loadedXML!== undefined&&  loadedXML.patients.patient.map((element, index) => (
                  <tr key={index}>
                    <td> {element.dob[0]}</td>
                    <td> {element.fName[0]}</td>
                    <td> {element.fileNo[0]}</td>
                    <td> {element.gender[0]}</td>
                    <td> {element.lName[0]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomeView;
