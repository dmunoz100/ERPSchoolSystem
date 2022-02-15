import {FormStudent} from '../Components/FormStudent'
import React,{useState,useEffect}from 'react';
import DataTable from 'react-data-table-component';
import * as StudentServices from '../Services/StudentServices'
import {ModalStudentSchoolSubject} from '../Components/ModalStudentSchoolSubject'


export const Student = () => {

    const [Data,setData] = useState([]);
    const [ItemSelected,setItemSelected] = useState();
    const [ShowModal,setShowModal] = useState(false);
    const [DataModal,setDataModal] = useState();
    const SelectedElement =(data) => setItemSelected(data);
    const DeleteElement = async (id) => {
        await StudentServices.Delete(id);
         await FillGrid();
     }


     const CloseModal =() => setShowModal(false);

    const columns = [
        {
            cell: (row) =>   <>
            <button className='btn btn-warning' onClick={e=>{ SelectedElement(row);}} >Edit</button> 
            <button className='btn btn-danger' onClick={e=>{ DeleteElement(row.studentId);}} >Delete</button> 
            <button className='btn btn-info' onClick={e=>{ setDataModal(row);setShowModal(true); }} >Add SchoolS ubject</button> 
           </> ,
             minWidth : "300px",
            button:true,
        },
        {
            name: 'Id',
            selector:  row => row.studentId
        },
        {
            name: 'studentName',
            selector: row => row.studentName,
        },
        {
            name: 'studentLastName',
            selector: row => row.studentLastName
        },
        {
            name: 'Date Birhday',
            selector: row => row.dateBirhday
        },
        {
            name: 'age',
            selector: row => row.age
        },
        {
            name: 'Scholarship',
            selector: row => row.scholarship.scholarshipName
        }
    ];
    
    const FillGrid = async () => setData([...await StudentServices.Get()]);

    useEffect(() => {
        (async() => {      
          await   FillGrid()
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);



    return (
        <div className="row">
            <div className="col-md-12">
                <h4>Students</h4>
            </div>

                <FormStudent DataItem={ItemSelected} setDataItem={setItemSelected} ReloadGrid={FillGrid}></FormStudent>
         
        <div className="col-md-12">
        {
                Data ? 
                <DataTable
                columns={columns}
                data={Data}
                />:""
            }
        </div>
        <ModalStudentSchoolSubject DataModal={DataModal} showModal={ShowModal} CloseModal={CloseModal} ></ModalStudentSchoolSubject>
        </div>
    );
}