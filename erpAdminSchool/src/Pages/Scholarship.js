import {FormScholarship} from '../Components/FormScholarship'
import DataTable from 'react-data-table-component';
import * as ScholarshipServices from '../Services/SchoolshipServices'
import React,{useState,useEffect}from 'react';
export const Scholarship = () => {


    const [Data,setData] = useState([]);
    const [ItemSelected,setItemSelected] = useState();

    const FillGrid = async () =>  setData([...await ScholarshipServices.Get()]);

    useEffect(() => {
        (async() => {      
            await FillGrid();
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      const DeleteElement = async (id) => {
          await ScholarshipServices.Delete(id);
          await FillGrid();
      }

      
    const SelectedElement =(data) => setItemSelected(data);

    const columns = [
        {
            cell: (row) =>
                    <>
                     <button className='btn btn-warning ' onClick={e=>{ SelectedElement(row);}} >Edit</button> 
                     <button className='btn btn-danger' onClick={e=>{ DeleteElement(row.scholarshipId);}} >Delete</button> 
                    </>
           ,
           minWidth : "300px",
            button:true,
        },
        {
            name: 'Id',
            selector: row => row.scholarshipId
        },
        {
            name: 'Scholarshi pName',
            selector: row => row.scholarshipName
        },
    ];
    

    return (
          <div className="row">
            <div className="col-md-12">
                <h4>Scholarship</h4>
            </div>
            <div className="col-md-12 mt-5">
              <FormScholarship DataItem={ItemSelected} setDataItem={setItemSelected} ReloadGrid={FillGrid}></FormScholarship>
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