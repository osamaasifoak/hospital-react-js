import React from "react";
import HeaderItemsConstant from "../constants/HeaderItemsConstant";
import { logoSvg } from "../assets/SvgAssets";

const AppHeaderComponent = (props) => {
  return (
    <div>
      <nav id="navBar">
        <>
          {logoSvg()}
          <ol id="listContainer">
            {HeaderItemsConstant.map((x) => {
              return (
                <li key={x.value} className="list" value={x.value}  onClick={()=>{props.onClickItems(x.data, x.value)}}>
                  {x.name}
                </li>
              );
            })}
          </ol>
        </>
      </nav>
    </div>
  );
};

export default AppHeaderComponent;
