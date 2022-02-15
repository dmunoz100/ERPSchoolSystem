import http from '../Helpers/http'

export const Get = async () =>{
    const {data} = await http.get(`SchoolSubjects`);
    return data;
}

export const GetItem = async(Id) =>{
    const {data} = await http.get(`SchoolSubjects/${Id}`);
    return data;
}

export const Insert = async(SchoolSubjects) =>{
    const {data,status} = await http.post(`SchoolSubjects`,SchoolSubjects).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}

export const Update = async(SchoolSubjects) =>{
    const {data,status} = await http.put(`SchoolSubjects/${SchoolSubjects.schoolSubjectId}`,SchoolSubjects).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}

export const Delete = async(Id) =>{
    const {data,status} = await http.delete(`SchoolSubjects/${Id}`).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}