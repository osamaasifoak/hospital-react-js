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
  const [tabIndex, setTabIndex] = React.useState(0);

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
                        //  {
                        //   if (element.fileNo[0] === e.target.value) {
                        //     return element;
                        //   }
                        // }
                      );
                    console.log(searchResult);
                    // console.log(result);
                    // setDropdown1Data(null);
                    // setTabIndex(null);
                    // setDropdown1Data(result);
                    // setTabIndex(index);
                    setLoadedXML([searchResult]);
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
            {console.log(loadedXML)}
            {loadedXML !== null && loadedXML !== undefined && (
              <SearchHospitalByPatientComponent searchResult={loadedXML} />
            )}
          </>
          // <div className="btn-group  " key={index}>
          //   <div
          //     className="btn btn-secondary dropdown-toggle"
          //     href="#"
          //     role="button"
          //     id="dropdownMenuLink"
          //     data-toggle="dropdown"
          //     // aria-haspopup="true"
          //     aria-expanded="true"
          //     // onClick={() => this._handleDropdown(index)}
          //   >
          //     {/* <p className="dot "></p>
          //     <p className="dot "></p>
          //     <p className="dot "></p> */}
          //   </div>

          //   <div
          //     className={"dropdown-menu show droppdown-content hide"}
          //     style={{ backgroundColor: "#191919" }}
          //     aria-labelledby="dropdownMenuLink"
          //   >
          //     <div
          //       className="dropdown-item"
          //       // onClick={() => this._setFloorDataForEdit(element, index)}
          //     >
          //       <span className="caret"> Edit</span>
          //     </div>
          //     <div
          //       className="dropdown-item"
          //       // onClick={() => this._askToDeleteFloor(element, index)}
          //     >
          //         <span className="caret">Delete</span>
          //     </div>
          //     <div
          //       className={"dropdown-item"}
          //       // onClick={() => this._toggleFloor(element, index)}
          //     >
          //         <span className="caret">{"Enable"}</span>
          //     </div>
          //   </div>
          // </div>
        );
      }
  }
};

export default HomeView;
