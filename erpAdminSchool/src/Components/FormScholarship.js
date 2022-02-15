import { Formik, Field, Form,ErrorMessage } from "formik";
import * as ScholarshipServices from '../Services/SchoolshipServices'

export const FormScholarship = (props) =>{

    const {DataItem,setDataItem,ReloadGrid} = props;

    const VaidateForm = Values => {
        const error = {};
        if(Values.scholarshipName === ""){
            error.scholarshipName = "*";
          }
        return error;
      }

      const SaveData = async (values,resetForm) => {
          if(values.scholarshipId === 0){
            await  ScholarshipServices.Insert(values);
            resetForm();
          }else {
            await  ScholarshipServices.Update(values);
            setDataItem({...{
              scholarshipId : 0,
              scholarshipName:""
            }});
          }
         await ReloadGrid();
        
      };


      return (
        <>
        <Formik
         enableReinitialize= {true}
         initialValues = {{
            scholarshipId : DataItem ? DataItem.scholarshipId : 0,
            scholarshipName: DataItem ?  DataItem.scholarshipName:"",
         }}
         validate={(Values) => { return VaidateForm(Values); }}     
         onSubmit={ async (values,{resetForm }) => {  await SaveData(values,resetForm); }}
      >
         {
            formik => <>
                <div className="form-group col-md-3">
                    <label>Scholarship Name</label>
                    <ErrorMessage render={msg => <i  className="text-danger">{msg}</i>   } name="scholarshipName" />
                    <Field className="form-control"  name="scholarshipName" />   
                </div>
     
                <div className="form-group col-md-12 m-5">
                             <button onClick={formik.handleSubmit} className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting} type="submit" variant="primary">OK</button>
                             <button variant="secondary" className="btn btn-white" onClick={(e)=>{ 
                               if(formik.values.scholarshipId === 0){
                                formik.resetForm();
                               }else {
                                setDataItem({...{
                                  scholarshipId : 0,
                                  scholarshipName:""
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