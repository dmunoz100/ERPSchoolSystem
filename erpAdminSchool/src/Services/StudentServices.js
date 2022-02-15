import http from '../Helpers/http'

export const Get = async () =>{
    const {data} = await http.get(`Students`);
    return data;
}

export const GetItem = async(Id) =>{
    const {data} = await http.get(`Students/${Id}`);
    return data;
}

export const Insert = async(Student) =>{
    const {data,status} = await http.post(`Students`,Student).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}

export const Update = async(Student) =>{
    const {data,status} = await http.put(`Students/${Student.studentId}`,Student).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}

export const Delete = async(Id) =>{
    const {data,status} = await http.delete(`Students/${Id}`).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}