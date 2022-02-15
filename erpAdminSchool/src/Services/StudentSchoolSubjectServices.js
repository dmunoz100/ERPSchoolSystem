import http from '../Helpers/http'

export const Get = async (Id) =>{
    const {data} = await http.get(`StudentSchoolSubjects/Student/${Id}`);
    return data;
}

export const Insert = async(StudentSchoolSubjects) =>{
    const {data,status} = await http.post(`StudentSchoolSubjects`,StudentSchoolSubjects).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}


export const Delete = async(Id) =>{
    const {data,status} = await http.delete(`StudentSchoolSubjects/${Id}`).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}