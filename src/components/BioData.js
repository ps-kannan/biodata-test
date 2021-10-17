//import React, { useEffect, useState } from 'react';
import  {Table,Button}  from 'react-bootstrap';


const BioData = ({bioData,setBioData,setFormStatus,setSingleData}) => {
    //console.log('bioData',bioData,bioData.length);
    //const [table,setTable] = useState(bioData);
    // const TableData = () =>{
    //     return (table.length)?
    //     table.map((data,index)=>{
    //         return <tr key={index}>
    //             <td>{data.firstName}</td>
    //             <td>{data.email}</td>
    //             <td>{data.phoneNum}</td>
    //             <td>
    //                 <Button variant="primary" onClick={onEditData({index})} size="sm">Edit</Button>
    //             </td>
    //             <td>
    //                 <Button variant="danger" onClick={onDeleteData({index})} size="sm">Delete</Button>
    //             </td>
    //             <td>
    //                 <Button variant="dark"  onClick={onViewData({index})} size="sm">View</Button>
    //             </td>
    //         </tr>;
    //     }):<tr><td colSpan="6">No Records</td></tr>;
    // };
    
    const onEditData = (id) => {
        setFormStatus("edit");
        let newId = Math.random()+"_"+id;
        //console.log('onEditData',id,newId);
        setSingleData(newId);
    };
    const onDeleteData = (id) => {
        //console.log('onDeleteData id: ',id);
        let oldData = [...bioData];
        //console.log('oldData',oldData);
        const newData = oldData.filter((data)=> data.id!==id);
        //console.log('newData',newData);
        setBioData(newData);
    };
    const onViewData = (id) => {
        setFormStatus("view");
        let newId = Math.random()+"_"+id;
        //console.log('onViewData',id,newId);
        setSingleData(newId);
    };
   
    return(
        
        <Table responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
               {(bioData.length)?
                    bioData.map((data,index)=>{
                        return <tr key={index}>
                                <td>{data.firstName}</td>
                                <td>{data.email}</td>
                                <td>{data.phoneNum}</td>
                                <td>
                                    <Button variant="primary" onClick={()=>{onEditData(data.id)}} size="sm">Edit</Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={()=>{onDeleteData(data.id)}} size="sm">Delete</Button>
                                </td>
                                <td>
                                    <Button variant="dark"  onClick={()=>{onViewData(data.id)}} size="sm">View</Button>
                                </td>
                            </tr>;
                        }):<tr><td colSpan="6">No Records</td></tr>
                    }
            </tbody>
        </Table>
        
    );
};

export default BioData;