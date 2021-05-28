import React from "react";
import axios from "axios";
import AppHeaderComponent from "../components/AppHeaderComponent";
import HeaderItemsConstant from "../constants/HeaderItemsConstant";
import PatientTableComponent from "../components/PatientTableComponent";
import HospitalTableCompoent from "../components/HospitalTableComponent";
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
      setLoadedXML(null);
      setTabIndex(null);
      setLoadedXML(result);
      setTabIndex(index);
    });
    // return response.data;
  }

  return (
    <>
      {/* {loadedXML !== undefined
        ? loadedXML.patients.patient.map((x) => {
            console.log(x);
          })
        : null} */}
      <div style={{ flex: 1 }}>
        {/* {AppHeaderComponent(loadXML)} */}
        <AppHeaderComponent onClickItems={loadXML} />
        <div style={{ backgroundColor: "#ffffff", flex: 1, marginTop: 20 }}>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              padding: 10,
            }}
          >
            <text>{HeaderItemsConstant[tabIndex]?.name}</text>
          </div>
          {getSelectedTable(tabIndex)}
        </div>
      </div>
    </>
  );

  function getSelectedTable(index) {
    console.log(index);
    if (loadedXML !== null)
      if (index === 0) {
        return <PatientTableComponent loadedXML={loadedXML} />;
      } else if (index === 1) {
        return <HospitalTableCompoent loadedXML={loadedXML} />;
      }
  }
};

export default HomeView;
