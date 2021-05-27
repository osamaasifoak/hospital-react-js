import  hospitalisation from '../xml/hospitalisations.xml';
import  hospitals from '../xml/hospitals.xml';
import patientList from '../xml/patients.xml';

export default [
  {
    name: "PATIENT BY LIST",
    value: "1",
    data: patientList
},
{
    name: "LIST OF ESTABLISHMENTS",
    value: "2",
    data: patientList
},
{
    name: "LIST OF HOSPITALS",
    value: "3",
    data: hospitals
},
{
    name: "HOSPITALS BY PATIENT",
    value: "4",
    data: hospitalisation
},
{
    name: "HOSPITALS AS PER PATIENT AND ESTABLISHMENTS",
    value: "5",
    data: patientList
  },
];
