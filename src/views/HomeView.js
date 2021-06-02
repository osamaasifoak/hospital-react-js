import React from "react";
import axios from "axios";
import AppHeaderComponent from "../components/AppHeaderComponent";
import HeaderItemsConstant from "../constants/HeaderItemsConstant";
import PatientTableComponent from "../components/PatientTableComponent";
import HospitalTableCompoent from "../components/HospitalTableComponent";
import HospitalisationTableComponent from "../components/HospitalisationTableComponent";
import hospitalisation from "../xml/hospitalisations.xml";
import hospitals from "../xml/hospitals.xml";
import patientList from "../xml/patients.xml";
import SearchHospitalByPatientComponent from "../components/SearchHospitalByPatientComponent";
var xml2js = require("xml2js");

const HomeView = () => {
  const [loadedXML, setLoadedXML] = React.useState();
  const [searchedData, setSearchedData] = React.useState();
  const [dropdown1Data, setDropdown1Data] = React.useState();
  const [dropdown2Data, setDropdown2Data] = React.useState();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [dropdown1SelectedValue, setDropdown1SelectedValue] = React.useState();
  async function loadXML(xml, index) {
    var response;
    if (index < 3) {
      response = await axios.get(xml, {
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
    } else if (index === 3) {
      response = await axios.get(HeaderItemsConstant[index].dropdown, {
        "Content-Type": "application/xml; charset=utf-8",
      });
      let parser = new xml2js.Parser();
      parser.parseString(response.data, function (err, result) {
        console.log(result);
        setDropdown1Data(null);
        setTabIndex(null);
        setDropdown1Data(result);
        setTabIndex(index);
      });
    } else if (index === 4) {
      response = await axios.get(HeaderItemsConstant[index].dropdown, {
        "Content-Type": "application/xml; charset=utf-8",
      });
      let parser = new xml2js.Parser();
      parser.parseString(response.data, function (err, result) {
        console.log(result);
        setDropdown1Data(null);
        setTabIndex(null);
        setDropdown1Data(result);
        setTabIndex(index);
      });
      var res = await axios.get(HeaderItemsConstant[index].dropdown1, {
        "Content-Type": "application/xml; charset=utf-8",
      });
      var uniquesItems = [];
      // let parser = new xml2js.Parser();
      parser.parseString(res.data, function (err, result) {
        result?.hospitalisations?.hospitalisation.map((element, index) => {
          var findItems = uniquesItems.find((x) => x === element.spec[0]);
          console.log(findItems);
          console.log(result);
          if (findItems === undefined) {
            uniquesItems.push(element.spec[0]);
          }
        });
        console.log(uniquesItems);
        setDropdown2Data(null);
        setDropdown2Data(uniquesItems);
      });
    }

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
      } else if (index === 2) {
        return <HospitalisationTableComponent loadedXML={loadedXML} />;
      } else if (index === 3) {
        return (
          <>
            <div
              className="col"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <select
                // value={params.selectField}
                onChange={async (e) => {
                  console.log(e.target.value);
                  var response = await axios.get(hospitalisation, {
                    "Content-Type": "application/xml; charset=utf-8",
                  });
                  let parser = new xml2js.Parser();
                  parser.parseString(response.data, function (err, result) {
                    var searchResult =
                      result.hospitalisations?.hospitalisation.find(
                        (element, index) => element.fileNo[0] === e.target.value
                      );
                    console.log(searchResult);
                    setSearchedData([searchResult]);
                  });
                }}
                className="select-form"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#5e5e5e",
                  color: "#000000",
                  flex: 1,
                }}
              >
                <option value={"SELECT"}>{"SELECT"}</option>
                {dropdown1Data?.patients?.patient.map((element, index) => (
                  <option
                    value={`${element.fileNo[0]}`}
                    id={element}
                    key={index}
                  >
                    {`${index + 1}. ${element.lName[0]}, ${element.fName[0]}`}
                  </option>
                ))}
              </select>
            </div>
            {console.log(searchedData)}
            {searchedData !== null && searchedData !== undefined && (
              <SearchHospitalByPatientComponent searchResult={searchedData} />
            )}
          </>
        );
      } else if (index === 4) {
        return (
          <>
            <div className="row d-flex justify-content-center">
              <div
                className="row m-2"
                style={
                  {
                    // flex: 1,
                    // justifyContent: "center",
                    // alignItems: "center",
                  }
                }
              >
                <text className="m-1">Select a hospital: </text>
                <select
                  // value={params.selectField}
                  onChange={async (e) => {
                    console.log(e.target.value);
                    setDropdown1SelectedValue(e.target.value);
                    // var response = await axios.get(hospitals, {
                    //   "Content-Type": "application/xml; charset=utf-8",
                    // });
                    // let parser = new xml2js.Parser();
                    // parser.parseString(response.data, function (err, result) {
                    //   var searchResult =
                    //     result.hospitals?.hospital.find(
                    //       (element, index) => element.fileNo[0] === e.target.value
                    //     );
                    //   console.log(searchResult);
                    //   setSearchedData([searchResult]);
                    // });
                  }}
                  className="select-form"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#5e5e5e",
                    color: "#000000",
                    // flex: 1,
                  }}
                >
                  <option value={"SELECT"}>{"SELECT"}</option>
                  {dropdown1Data?.hospitals?.hospital.map((element, index) => (
                    <option
                      value={`${element.buildCode[0]}`}
                      id={element}
                      key={index}
                    >
                      {`${element.buildCode[0]}. ${element.name[0]}`}
                    </option>
                  ))}
                </select>
              </div>
              {dropdown1SelectedValue !== null &&
              dropdown1SelectedValue !== undefined ? (
                <div
                  className="row m-2"
                  style={
                    {
                      // flex: 1,
                      // justifyContent: "center",
                      // alignItems: "center",
                    }
                  }
                >
                  <text>Select a specialty: </text>
                  <select
                    // value={params.selectField}
                    onChange={async (e) => {
                      console.log(e.target.value);
                      console.log(dropdown1SelectedValue);
                      // setDropdown1SelectedValue(e.target.value);
                      var response = await axios.get(hospitalisation, {
                        "Content-Type": "application/xml; charset=utf-8",
                      });
                      let parser = new xml2js.Parser();
                      parser.parseString(response.data, function (err, result) {
                        var searchResult =
                          result.hospitalisations?.hospitalisation.find(
                            (element, index) =>
                              element.spec[0] === e.target.value &&
                              element.buildCode[0] === dropdown1SelectedValue
                          );
                        console.log(searchResult);
                        if (searchResult !== undefined) {
                          setSearchedData([searchResult]);
                        } else {
                          setSearchedData(null);
                        }
                      });
                    }}
                    className="select-form"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#5e5e5e",
                      color: "#000000",
                      // flex: 1,
                    }}
                  >
                    <option value={"SELECT"}>{"SELECT"}</option>
                    {dropdown2Data?.map((element, index) => (
                      <option value={`${element}`} id={element} key={index}>
                        {`${index + 1}. ${element}`}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
            {console.log(searchedData)}
            {searchedData !== null && searchedData !== undefined && (
              <SearchHospitalByPatientComponent searchResult={searchedData} />
            )}
          </>
        );
      }
  }
};

export default HomeView;
