import React from 'react';
import ReactDOM from 'react-dom';

/* Fragment */
// let data = [
//   { id: 1, name: 'destiny', age: 26 },
//   { id: 2, name: 'hello', age: 10 },
// ];

// class Column extends React.Component {
//   render() {
//     let { data } = this.props;

//     // <React.Fragment></React.Fragment>
//     // 语法糖, 直接写 <></>
//     return (
//       <>
//         <td>{data.id}</td>
//         <td>{data.name}</td>
//         <td>{data.age}</td>
//       </>
//     );
//   }
// }

// class Table extends React.Component {
//   render() {
//     let { data } = this.props;

//     return (
//       <table>
//         <thead>
//           <tr>
//             <td>ID</td>
//             <td>名称</td>
//             <td>年龄</td>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => {
//             return (
//               <tr key={index}>
//                 <Column data={item} />
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   }
// }

ReactDOM.render(<Table data={data} />, document.getElementById('root'));
