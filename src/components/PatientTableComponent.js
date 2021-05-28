const PatientTableCompoent = (props) => {
  return (
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
      <tbody>
        {props?.loadedXML !== undefined &&
          props?.loadedXML?.patients?.patient.map((element, index) => (
            <tr key={index}>
              <td> {element.dob[0]}</td>
              <td> {element.fName[0]}</td>
              <td> {element.fileNo[0]}</td>
              <td> {element.gender[0]}</td>
              <td> {element.lName[0]}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PatientTableCompoent;