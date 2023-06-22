import { useState, useEffect } from "react";
import ReactDOM from "react-dom";


const ShowModal = ({ closeModal, children}) => {
  const [containerToLoad, setContainerToLoad] = useState(null);
  
  useEffect(() => {
    setContainerToLoad(document.getElementById('myPortalModalDiv'));
    if(containerToLoad) {
      console.log(containerToLoad);
    }
    else{
      console.log("No document found");
    }
  }, []);

  return containerToLoad && ReactDOM.createPortal(
    <div className="fixed inset-0 grid place-content-center h-screen bg-gray-400 bg-opacity-90">
          <div className="fixed inset-0 bg-gray-400 bg-opacity-90" onClick={closeModal}></div>
          <div className="max-w-lg mx-auto transform rounded-md bg-white">
            {children}
          </div>
    </div>, containerToLoad);
};


// const ShowModal = ({ closeModal, children}) => {

//   const [domReady, setDomReady] = useState(false)

//   useEffect(() => {
//     setDomReady(true)
//   })
 

//   return domReady ? ReactDOM.createPortal(
//     <div>
//       <div onClick={closeModal}></div>
//       <div>
//         {children}
//       </div>
//     </div>,
//     document.getElementById(".myPortalModalDiv")
//   ) : null;
// };

export default ShowModal;