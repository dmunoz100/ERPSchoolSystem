import {FormSchoolSubject} from '../Components/FormSchoolSubject'
import React,{useState,useEffect}from 'react';
import DataTable from 'react-data-table-component';
import * as schoolSubjectServices from '../Services/SchoolSubjectServices'
export const SchoolSubject = () => {


    const [Data,setData] = useState([]);
    const [ItemSelected,setItemSelected] = useState();
    
    const SelectedElement =(data) => setItemSelected(data);

    const columns = [
        {
            cell: (row) =>  <>
            <button className='btn btn-warning' onClick={e=>{ SelectedElement(row);}} >Edit</button> 
            <button className='btn btn-danger' onClick={e=>{ DeleteElement(row.schoolSubjectId);}} >Delete</button> 
           </>,
               minWidth : "300px",
            button:true,
        },
        {
            name: 'Id',
            selector: row => row.schoolSubjectId
        },
        {
            name: 'Scholarshi pName',
            selector: row => row.schoolSubjectName
        },
    ];
    
    const FillGrid = async () => {
         setData([...await schoolSubjectServices.Get()]);
    }

    const DeleteElement = async (id) => {
        await schoolSubjectServices.Delete(id);
        await FillGrid();
    }

    useEffect(() => {
        (async() => {      
            await  FillGrid();
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    return(
        <div className="row">
            <div className="col-md-12">
                <h4>SchoolSubject</h4>
            </div>
            <div className="col-md-12 mt-5">
                <FormSchoolSubject DataItem={ItemSelected} setDataItem={setItemSelected} ReloadGrid={FillGrid}></FormSchoolSubject>
        </div>
        <div className="col-md-12">
        {
                Data ? 
                <DataTable
                columns={columns}
                data={Data}
                />:""
            }
        </div>
        </div>
    );
}