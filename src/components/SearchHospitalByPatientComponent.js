const SearchHospitalByPatientComponent = (props) => {
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
            <th scope="col">admDate</th>
            <th scope="col">buildCode</th>
            <th scope="col">fileNo</th>
            <th scope="col">outDate</th>
            <th scope="col">spec</th>
          </tr>
        </thead>
        <tbody>
          {
          props.searchResult.map((element, index) => (
              <tr key={index}>
                <td> {element.admDate[0]}</td>
                <td> {element.buildCode[0]}</td>
                <td> {element.fileNo[0]}</td>
                <td> {element.outDate[0]}</td>
                <td> {element.spec[0]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };
  
  export default SearchHospitalByPatientComponent ;