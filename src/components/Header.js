import React from 'react';

const  Header = (props) => {
      return (
         <header className="top">
            <h1>
               Sales 
               <span className="ofThe">
                  <span className="of">of</span>
                  <span className="the">the</span>
               </span>
               Dayv
               </h1>
            <h3 className="tagline">{props.tagline}</h3>
         </header>
      );
}

export default Header;