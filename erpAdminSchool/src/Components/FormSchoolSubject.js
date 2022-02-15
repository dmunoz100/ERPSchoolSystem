import { Formik, Field, Form,ErrorMessage } from "formik";
import * as schoolSubjectServices from '../Services/SchoolSubjectServices'

export const FormSchoolSubject = (props) =>{

    const {DataItem,setDataItem,ReloadGrid} = props;

    const VaidateForm = Values => {
        const error = {};
        if(Values.schoolSubjectName === ""){
            error.schoolSubjectName = "*";
          }
        return error;
      }

      const SaveData = async (values,resetForm) => {
          if(values.schoolSubjectId === 0){
           await schoolSubjectServices.Insert(values);
           resetForm();
          }else {
            await schoolSubjectServices.Update(values);
            setDataItem({...{
              schoolSubjectId : 0,
              schoolSubjectName : ""
            }})
          }
          await ReloadGrid(); ReloadGrid();
        
      };


      return (
        <>
        <Formik
         enableReinitialize= {true}
         initialValues = {{
            schoolSubjectId : DataItem ? DataItem.schoolSubjectId :0,
            schoolSubjectName: DataItem ? DataItem.schoolSubjectName : "",
         }}
         validate={(Values) => { return VaidateForm(Values); }}     
         onSubmit={ async (values,{resetForm }) => {  await SaveData(values,resetForm); }}
      >
         {
            formik => <>
                <div className="form-group col-md-3">
                    <label>SchoolSubject Name</label>
                    <ErrorMessage render={msg => <i  className="text-danger">{msg}</i>   } name="schoolSubjectName" />
                    <Field className="form-control"  name="schoolSubjectName" />   
                </div>
     
                <div className="form-group col-md-12 m-5">
                             <button onClick={formik.handleSubmit} className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting} type="submit" variant="primary">OK</button>
                             <button variant="secondary" className="btn btn-white" onClick={(e)=>{ 

                                if(formik.values.schoolSubjectId === 0){
                                  formik.resetForm() 
                                }else {
                                  setDataItem({...{
                                    schoolSubjectId : 0,
                                    schoolSubjectName : ""
                                  }})
                                }

                               
                                
                                
                                }}>Cancel</button>  
                     </div> 

            </>
         }
      </Formik>
        </>
    )

}