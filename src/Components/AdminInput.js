// import React from "react";
// import db from '../firebase'

// export const AdminInput = ({ queue }) => {
//   const [name, setName] = React.useState(queue.name);

//   const onUpdate = () => {
//     //const db = firebase.firestore()
//     db.collection('queue').doc(queue.id).set({ ...queue, name })
//   }

//   const onDelete = () => {
//     //const db = firebase.firestore()
//     db.collection('queue').doc(queue.id).delete()
//   }

//   return (
//     <>
//       <input
//         value={name}
//         onChange={e => {
//           setName(e.target.value);
//         }}
//       />
//       <button onClick={onUpdate}>Update</button>
//       <button onClick={onDelete}>Delete</button>
//     </>
//   );
// };
