import React from "react";
import axios from "axios";
import AppHeaderComponent from "../components/AppHeaderComponent";

const HomeView = () => {
  const [loadedXML, setLoadedXML] = React.useState("");
  async function loadXML(xml) {
    var response = await axios.get(xml, {
      "Content-Type": "application/xml; charset=utf-8",
    });
    console.log("AXIOS RESPONSE\n", response.data);
    setLoadedXML(response.data);
    return response.data;
  }

  return (
    <div>
      {AppHeaderComponent(loadXML)}
    </div>
  );
};

export default HomeView;
