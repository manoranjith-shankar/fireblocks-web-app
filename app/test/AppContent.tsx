// import React from "react";

// import { useAppStore } from "../AppStore";


// export const AppContent: React.FC = () => {
//   const {
//     loginToDemoAppServerStatus,
//     assignDeviceStatus,
//     appStoreInitialized,
//     fireblocksNCWStatus,
//     initAppStore,
//     disposeAppStore,
//     appMode,
//   } = useAppStore();

//   React.useEffect(() => {
//     if (appStoreInitialized) {
//       return () => {
//         disposeAppStore();
//       };
//     } else {
//       initAppStore();
//     }
//   });

//   if (!appStoreInitialized) {
//     return null;
//   }

//   return (
//     <>
//       {loginToDemoAppServerStatus === "success" && (
//         <p>
//           Logged in to Demo App Server.
//         </p>
//       )}
//     </>
//   );
// };