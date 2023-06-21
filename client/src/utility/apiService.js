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