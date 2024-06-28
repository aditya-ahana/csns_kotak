// import React from "react";

// import { FaRegUserCircle } from "react-icons/fa";

// export default function Header() {
//   return (
//     <>
//       <div
//         className="headerContainer d-flex align-items-center justify-content-end"
//         style={{ height: "-webkit-fill-available" }}
//       >
//         <div
//           className="headerContent"
//           // style={{ width: "6%" }}
//         >
//           <div className="d-flex flex-row justify-content-start align-items-center">
//             <div className="headerUserName">
//               <span>Admin</span>
//             </div>
//             <div className="p-1"></div>
//             <div className="headerUserIcon">
//               <span>
//                 <FaRegUserCircle />
//               </span>
//             </div>
//             <div className="p-3"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";

import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <div
        className="headerContainer d-flex align-items-center justify-content-end"
        style={{ height: "-webkit-fill-available" }}
      >
        <div
          className="headerContent"
          // style={{ width: "6%" }}
        >
          <div className="d-flex flex-row justify-content-start align-items-center">
            <span>Admin</span>
            <div className="p-1"></div>
            <FaRegUserCircle />
            <div className="p-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
