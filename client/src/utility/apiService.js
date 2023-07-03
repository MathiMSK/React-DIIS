import axios from "axios";
//  ******************** Base URL ***********************
let baseUrl = "http://localhost:7373/api/";

let token = localStorage.getItem("token");
if (token) {
  token = JSON.parse(token);
}

export const createUser = async (body) => {
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}user/reg`, requestOptions);
    if (!response.ok) {
      let data = await response.json();
      return { data: data, ok: false };
    }
    let data = await response?.json();
    return { data: data, ok: true };
  };

  export const userLogin = async (body) => {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}user/login`, requestOptions);
    if (!response.ok) {
      let data = await response.json();
      return { data: data, ok: false };
    }
    let data = await response?.json();
    return { data: data, ok: true };
  };

  export const createAssign = async (body) => {
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    console.log(body);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}assign/createassign`, requestOptions);
    if (!response.ok) {
      let data = await response.json();
      return { data: data, ok: false };
    }
    let data = await response?.json();
    return { data: data, ok: true };
  };

  export const getById = async (id) => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      const response = await fetch(
        `${baseUrl}user/getbyid/${id}`,
        requestOptions
      );
      if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false };
      }
      let data = await response?.json();
      return { data: data, ok: true };
    }
  };

  export const getAllAssign = async () => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      const response = await fetch(
        `${baseUrl}assign/getallassign`,
        requestOptions
      );
      if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false };
      }
      let data = await response?.json();
      return { data: data, ok: true };
    }
  }

  export const stdViewTheirAllAssign = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    const response = await fetch(`${baseUrl}stdassign/stdviewallassign`,requestOptions);
    if (!response.ok) {
      let data = await response.json();
      return { data: data, ok: false };
    }
    let data = await response?.json();
    return { data: data, ok: true };
  };

  export const assAttend = async (id,body) => {
    console.log(body);
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    const requestOptions = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}stdassign/attendassign/${id}`,requestOptions);
    if (!response.ok) {
      let data = await response.json();
      return { data: data, ok: false };
    }
    let data = await response?.json();
    return { data: data, ok: true };
  };

  export const viewStuAssById = async (id) => {
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    const response = await fetch(`${baseUrl}stdassign/stdviewsingleassignans/${id}`,requestOptions);
    if (!response.ok) {
      let data = await response.json();
      return { data: data, ok: false };
    }
    let data = await response?.json();
    return { data: data, ok: true };
  };

  export const generatePDF = async (subjectVal,classVal,stdidVal,assVal)=>{
    let token = localStorage.getItem("token");
    if(token){
      token = JSON.parse(token);
    }
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };
    if(assVal !== undefined && subjectVal!== undefined && classVal!== undefined){
      return await axios.get(`${baseUrl}assign/get?view=true&class=${classVal}&assignmentid=${assVal}&subject=${subjectVal}`)
    }else if(assVal !== undefined && subjectVal !== undefined ){
      return await axios.get(`${baseUrl}assign/get?view=true&subject=${subjectVal}&assignmentid=${assVal}`)
    }else if(subjectVal!== undefined){
      return await axios.get(`${baseUrl}assign/get?view=true&subject=${subjectVal}`)
    }else if(classVal!== undefined){
      return await axios.get(`${baseUrl}assign/get?view=true&class=${classVal}`)
    }else if(stdidVal!== undefined){
      return await axios.get(`${baseUrl}assign/get?view=true&stdid=${stdidVal}`)
    }else if(assVal!== undefined){
      return await axios.get(`${baseUrl}assign/get?view=true&assignmentid=${assVal}`)
    }else{
      return await axios.get(`${baseUrl}assign/get?view=true`)
    }
  } 
 
  export const getTicketsPdf =async (subjectVal,classVal,stdidVal,assVal)=> {
    if(assVal !== undefined && subjectVal!== undefined && classVal !== undefined){
      return axios.get(`${baseUrl}assign/get?view=false&class=${classVal}&assignmentid=${assVal}&subject=${subjectVal}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }else if(assVal !== undefined && subjectVal !== undefined  ){
      return axios.get(`${baseUrl}assign/get?view=false&assignmentid=${assVal}&subject=${subjectVal}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }else if(classVal== undefined && subjectVal !== undefined){
      return axios.get(`${baseUrl}assign/get?view=false&subject=${subjectVal}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }else if(classVal !== undefined && subjectVal == undefined){
      return axios.get(`${baseUrl}assign/get?view=false&class=${classVal}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }else if(stdidVal!== undefined){
      return axios.get(`${baseUrl}assign/get?view=false&stdid=${stdidVal}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }else if(assVal!== undefined){
      return axios.get(`${baseUrl}assign/get?view=false&assignmentid=${assVal}`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    
    }else{
      return axios.get(`${baseUrl}assign/get?view=false`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
    }
  }

  export const getAllUser = async () => {
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      const response = await fetch(
        `${baseUrl}user/getalluser`,
        requestOptions
      );
      if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false };
      }
      let data = await response?.json();
      return { data: data, ok: true };
    }
  }

  export const getProfile = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    const requestOptions = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    };

      const response = await fetch(
        `${baseUrl}user/profile`,
        requestOptions
      );
      if (!response.ok) {
        let data = await response.json();
        return { data: data, ok: false };
      }
      let data = await response?.json();
      return { data: data, ok: true };
  }