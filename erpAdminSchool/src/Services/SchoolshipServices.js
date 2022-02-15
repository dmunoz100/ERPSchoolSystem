import http from '../Helpers/http'

export const Get = async () =>{
    const {data} = await http.get(`Scholarships`);
    return data;
}

export const GetItem = async(Id) =>{
    const {data} = await http.get(`Scholarships/${Id}`);
    return data;
}

export const Insert = async(Scholarships) =>{
    const {data,status} = await http.post(`Scholarships`,Scholarships).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}

export const Update = async(Scholarships) =>{
    const {data,status} = await http.put(`Scholarships/${Scholarships.scholarshipId}`,Scholarships).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}

export const Delete = async(Id) =>{
    const {data,status} = await http.delete(`Scholarships/${Id}`).catch(error=>{ return error.response });
    if( status === 400 ){
        data.errorNumber = status;
    }
    return data;
}