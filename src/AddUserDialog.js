import { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TableContext } from "./TableContext";

const TOKEN_URI = "https://abz-application.herokuapp.com/api/v1/token";
const POSITIONS_URI = "https://abz-application.herokuapp.com/api/v1/positions";
const USERSPOST_URI = "https://abz-application.herokuapp.com/api/v1/users";

export function useFetch(uri, params) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;
    let url = new URL(uri);
    for (let k in params) { url.searchParams.append(k, params[k]); }

    fetch(TOKEN_URI)
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((response) => {
        return response.token;
      })
      .then(token => {
        return fetch(url, {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          })
        });
      })
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((value) => { setData(value); return value; })
      .then((value) => {setLoading(false); })
      .catch(error => {setError(error); setLoading(false); toast.error(error.message);});
  }, [uri, params]);

  return {
    loading,
    data,
    error
  };
}

export function usePostUser(uri, params, setUserUploaded) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!uri || !params) return;
    
    fetch(TOKEN_URI)
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((response) => {
        return response.token;
      })
      .then(token => {
        return fetch(uri,
          {
            method: 'post',
            body: params,
            headers: new Headers({
              'Authorization': 'Bearer ' + token,
              //"Content-Type": "multipart/form-data"
            }),
          });
      })
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(`${response.status} ${response.statusText}`);
       })
      .then((value) => { setData(value); return value; })
      .then((value) => { console.log(value); return value; })
      .then((value) => {setLoading(false); toast(value.message); setUserUploaded(true);})
      .catch(error => {setError(error); setLoading(false); toast.error(error.message); });
  }, [uri, params, setUserUploaded]);

  return {
    loading,
    data,
    error
  };
}

function AddUserDialog() {
  const table = useContext(TableContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(1);
  const [photo, setPhoto] = useState("");
  const [params, setParams] = useState(null);
  const [file, setFile] = useState(null);
  const [userUploaded, setUserUploaded] = useState(false);
  const { loading, data, error } = useFetch(POSITIONS_URI);
  const { error2 } = usePostUser(USERSPOST_URI, params, setUserUploaded);

  const submit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("photo", photo);
    formData.append("file", file);
    setParams(formData);
  }

  useEffect(() => {
    (async() => {
      if(userUploaded) {
        await table.dataAdded();
        setUserUploaded(false);
      }
    })();
  }, [table, userUploaded, setUserUploaded]);

  if (error || error2) return;
  if (loading) return <p>Loading...</p>;

  return (
    <form encType="multipart/form-data" onSubmit={(event) => submit(event)}>
      <label forhtml="userName" className="form-label">Username</label>
      <input id="userName" className="form-control" type="text" value={username} onChange={(event) => { setUsername(event.target.value) }}></input>
      <label forhtml="userEmail" className="form-label">Email</label>
      <input id="userEmail" className="form-control" type="email" value={email} onChange={(event) => { setEmail(event.target.value) }}></input>
      <label forhtml="userPhone" className="form-label">Phone</label>
      <input id="userPhone" className="form-control" type="tel" pattern="\+380\d{9}" value={phone} onChange={(event) => { setPhone(event.target.value) }}></input>
      <label forhtml="userPosition" className="form-label">Position</label>
      <select className="form-select" id="userPosition" aria-label="Position select" value={position} onChange={(event) => { setPosition(event.target.value) }}>
        <option disabled>Open this select menu</option>
        {!!data.positions && data.positions.map(item => {
          return (<option value={item.id} key={item.id}>{item.name}</option>);
        })}
      </select>
      <label forhtml="userPhoto" className="form-label">Image</label>
      <input id="userPhoto" className="form-control" type="file" value={photo} onChange={(event) => { setPhoto(event.target.value); setFile(event.target.files[0]); }}></input>
      <input type="submit" className="form-control btn btn-primary" value="Submit" />
    </form>
  );
}

export default AddUserDialog;
