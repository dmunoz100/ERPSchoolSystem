import { Formik, Field, Form,ErrorMessage } from "formik";
import React,{useState,useEffect}from 'react';
import * as ScholarshipServices from '../Services/SchoolshipServices'
import * as StudenServices from '../Services/StudentServices'
export const FormStudent =(props)=> {

    const {DataItem,setDataItem,ReloadGrid} = props;
    const [Scholarship,setScholarship] = useState();

    const VaidateForm = Values => {
        const error = {};
        if(Values.studentName === ""){
            error.studentName = "*";
          }
          if(Values.studentLastName === ""){
            error.studentLastName = "*";
          }
          if(Values.age === ""){
            error.age = "*";
          }
          if(Values.age === 0){
            error.age = "Debe ser Mayor a 0";
          }

          if(Values.scholarshipId === "0"){
            error.scholarshipId = "*";
          }
         
          if(Values.dateBirhday === ""){
            error.dateBirhday = "*";
          }
        return error;
      }

      const SaveData = async (values,resetForm) => {
          if(values.studentId === 0){
              await  StudenServices.Insert(values);
              resetForm();
          }else {
            await  StudenServices.Update(values);
            setDataItem({...{
              studentId :   0,
              studentName: "",
              studentLastName: "",
              age:  "",
              scholarshipId: "0",
              dateBirhday: ""
            }});
          }
         await ReloadGrid();
   
      };

      useEffect(() => {
        (async() => {      
            setScholarship(await ScholarshipServices.Get());
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    return (
        <>
        <Formik
         enableReinitialize= {true}
         initialValues = {{
            studentId : DataItem ? DataItem.studentId :  0,
            studentName: DataItem ? DataItem.studentName :"",
            studentLastName: DataItem ? DataItem.studentLastName :"",
            age: DataItem ? DataItem.age : "",
            scholarshipId: DataItem ? DataItem.scholarshipId :"0",
            dateBirhday: DataItem ? DataItem.dateBirhday.split("T")[0] :"",
         }}
         validate={(Values) => { return VaidateForm(Values); }}     
         onSubmit={ async (values,{resetForm }) => {  await SaveData(values,resetForm); }}
      >
         {
            formik => <>
                <div className="form-group col-md-3">
                    <label>Name</label>
                    <ErrorMessage render={msg => <i  className="text-danger">{msg}</i>   } name="studentName" />
                    <Field className="form-control"  name="studentName" />   
                </div>
                <div className="form-group col-md-3">
                    <label>Last Name</label>
                    <ErrorMessage render={msg => <i  className=" text-danger">{msg}</i>   } name="studentLastName" />
                    <Field className="form-control"  name="studentLastName" />   
                </div>
                <div className="form-group col-md-3">
                    <label>age</label>
                    <ErrorMessage render={msg => <i  className=" text-danger">{msg}</i>   } name="age" />
                    <Field type="number" className="form-control"  name="age" />   
                </div>

                <div className="form-group col-md-3">
                    <label>Date Birhday</label>
                    <ErrorMessage render={msg => <i  className=" text-danger">{msg}</i>   } name="dateBirhday" />
                    <Field type="date" className="form-control"  name="dateBirhday" />   
                </div>

                <div className="form-group col-md-3">
                    <label>Scholarship</label>
                    <ErrorMessage render={msg => <i  className="text-danger">{msg}</i>   } name="scholarshipId" />
                    <Field  as="select" className="form-control"  name="scholarshipId" >
                      <option value="0">--Select--</option>
                    {
                         Scholarship  ? Scholarship.map(i => {
                            return <option key={i.scholarshipId}  value={i.scholarshipId}>{i.scholarshipName}</option>
                        }) : ""
                    }
                     </Field> 
                  
                </div>
        
                <div className="form-group col-md-12 m-5">
                             <button onClick={formik.handleSubmit} className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting} type="submit" variant="primary">OK</button>
                             <button variant="secondary" className="btn btn-white" onClick={(e)=>{  

                                if(formik.values.studentId === 0){
                                  formik.resetForm() 
                                }else {
                                  setDataItem({...{
                                    studentId :   0,
                                    studentName: "",
                                    studentLastName: "",
                                    age:  "",
                                    scholarshipId: "0",
                                    dateBirhday: ""
                                  }});
                                }                       
                               }}>Cancel</button>  
                     </div> 

            </>
         }
      </Formik>
        </>
    )
}