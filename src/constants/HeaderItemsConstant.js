import hospitalisation from "../xml/hospitalisations.xml";
import hospitals from "../xml/hospitals.xml";
import patientList from "../xml/patients.xml";

export default [
  {
    name: "PATIENT BY LIST",
    value: 0,
    data: patientList,
    searchIn: null,
    dropdown: null,
  },
  {
    name: "LIST OF ESTABLISHMENTS",
    value: 1,
    data: hospitals,
    searchIn: null,
    dropdown: null,
  },
  {
    name: "LIST OF HOSPITALS",
    value: 2,
    data: hospitalisation,
    searchIn: null,
    dropdown: null,
  },
  {
    name: "HOSPITALS BY PATIENT",
    value: 3,
    data: null,
    searchIn: hospitalisation,
    dropdown: patientList,
  },
  {
    name: "HOSPITALS AS PER PATIENT AND ESTABLISHMENTS",
    value: 4,
    data: null,
    searchIn: hospitalisation,
    dropdown: patientList,
    dropdown1: null,
  },
];
