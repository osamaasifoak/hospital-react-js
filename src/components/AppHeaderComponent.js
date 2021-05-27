import React from "react";
import HeaderItemsConstant from "../constants/HeaderItemsConstant";
import { logoSvg } from "../assets/SvgAssets";

const AppHeaderComponent = (onClickItems) => {
  return (
    <div>
      <nav id="navBar">
        <>
          {logoSvg()}
          <ol id="listContainer">
            {HeaderItemsConstant.map((x) => {
              return (
                <li className="list" value={x.value} onClick={onClickItems(x.data)}>
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
