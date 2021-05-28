const HospitalTableCompoent = (props) => {
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
          <th scope="col">addr</th>
          <th scope="col">buildCode</th>
          <th scope="col">name</th>
          <th scope="col">phone</th>
          <th scope="col">postCode</th>
        </tr>
      </thead>
      <tbody>
        {props.loadedXML !== undefined &&
          props.loadedXML?.hospitals?.hospital.map((element, index) => (
            <tr key={index}>
              <td> {element.addr[0]}</td>
              <td> {element.buildCode[0]}</td>
              <td> {element.name[0]}</td>
              <td> {element.phone[0]}</td>
              <td> {element.postCode[0]}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default HospitalTableCompoent ;