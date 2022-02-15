import {Modal,Button} from 'react-bootstrap'
import React,{useState,useEffect}from 'react';
import * as SchoolSubjectServices from '../Services/SchoolSubjectServices'
import { Formik, Field, Form,ErrorMessage } from "formik";
import * as StudentSchoolSubjectServices from '../Services/StudentSchoolSubjectServices'
import DataTable from 'react-data-table-component';

export const  ModalStudentSchoolSubject = (props) => {

    const {
        showModal,
        CloseModal,
        DataModal
    } = props;

    const [SchoolSubject,setSchoolSubject] = useState();
    const [Data,setData] = useState();

    const DeleteElement = async (Id) => {
      await StudentSchoolSubjectServices.Delete(Id);
      await FillGrid();
    } 


    const columns = [
      {
        cell: (row) =>
                <>
                 <button className='btn btn-danger' onClick={e=>{ DeleteElement(row.studentSchoolSubjectId);}} >Delete</button> 
                </>
       ,
       minWidth : "300px",
        button:true,
    },
        {
            name: 'Id',
            selector: row => row.schoolSubject.schoolSubjectName,
        }
    ];
    

   

    const VaidateForm = Values => {
        const error = {};
        if(Values.schoolSubjectId === "0"){
            error.schoolSubjectId = "*";
        }
        return error;
      }

      const SaveData = async (values,resetForm) => {
            debugger;
            if(Data.filter(x=>x.schoolSubjectId.toString() === values.schoolSubjectId).length > 0){
                alert("Materia Ya se encuentra selecionada");
            }else {
              await StudentSchoolSubjectServices.Insert(values);       
              await FillGrid();
              resetForm();
            }        
      };

      const FillGrid = async () =>   setData([...await  StudentSchoolSubjectServices.Get( DataModal.studentId)]);

    useEffect(() => {
        (async() => {      
            setSchoolSubject(await SchoolSubjectServices.Get());
            if (DataModal){
               await FillGrid();
            }      
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[showModal]);

    return (

        <Formik
        enableReinitialize= {true}
        initialValues = {{
           studentId : DataModal ? DataModal.studentId:0,
           schoolSubjectId : "0"
        }}
        validate={(Values) => { return VaidateForm(Values); }}     
        onSubmit={ async (values,{resetForm }) => {  await SaveData(values,resetForm); }}
     >
        
        {
        formik=>
        <Modal show={showModal} >
        <Modal.Header >
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
            <div className='row'>
         
                <div className="form-group col-md-6">
                    <label>Scholarship</label>
                    <ErrorMessage render={msg => <i  className="text-danger">{msg}</i>   } name="schoolSubjectId" />
                    <Field  as="select" className="form-control"  name="schoolSubjectId" >
                      <option value="0">--Select--</option>
                    {
                         SchoolSubject  ? SchoolSubject.map(i => {
                            return <option key={i.schoolSubjectId}  value={i.schoolSubjectId}>{i.schoolSubjectName}</option>
                        }) : ""
                    }
                     </Field> 
                  
                </div>
             
                <div className='col-md-6'>
                <Button className='p-6'  onClick={formik.handleSubmit} disabled={!formik.isValid || formik.isSubmitting} variant="primary" >
                    Add
                </Button>
                </div>
                <div className='col-md-12'>
                {
                Data ? 
                <DataTable
                columns={columns}
                data={Data}
                />:""
            }
                </div>
            </div>

   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => { formik.resetForm(); CloseModal();}}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
}
      </Formik>
    );

}