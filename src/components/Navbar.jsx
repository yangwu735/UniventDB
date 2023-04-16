import React, {useEffect} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import defaultAvatar from '../data/defaultAvatar.jpg';
import { useStateContext } from '../contexts/ContextProvider';
import Button from './Button';

const Navbar = () => {
  const {activeMenu, setActiveMenu, currentColor} = useStateContext();

  return (
    <div className="flex justify-between p-2 md-mx=6 relative mt-2"
    style={activeMenu ? {visibility: "hidden"} : {visibility: "visible"}}>
      <TooltipComponent content={"Menu"} position="BottomCenter">
        <button
          type="button"
          onClick={() => setActiveMenu(!activeMenu)}
          style={{ currentColor }}
          className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
        {<AiOutlineMenu style={{color: currentColor}}/>}
        </button>
      </TooltipComponent>
    </div>
  )
}

export default Navbar