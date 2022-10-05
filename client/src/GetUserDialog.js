import { Buffer } from "buffer";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOKEN_URI = "http://localhost:5000/api/v1/token";
const USER_ID_URI = "http://localhost:5000/api/v1/users/";

function GetUserDialog() {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();

    const onSubmit = async (event, uri, userId) => {
        event.preventDefault();
        
        if (!uri || !userId) {
            toast.error("Specify user id");
            return;
        }
        
        const asyncFetch = async () => {
            let url = `${uri}${userId}`;
            setLoading(true);
            
            return fetch(TOKEN_URI)
                .then(response => {
                    if(response.ok) return response.json();
                    else throw new Error(`${response.status} ${response.statusText}`);
                })
                .then((response) => {
                    return response.token;
                })
                .then(token => {
                    return fetch(url,
                        {
                            method: 'get',
                            headers: new Headers({
                                'Authorization': 'Bearer ' + token,
                                "Content-Type": "application/json"
                            }),
                        });
                })
                .then(response => {
                    if(response.ok) return response.json();
                    else throw new Error(`${response.status} ${response.statusText}`);
                })
                .then((value) => { setData(value); return value; })
                .then((value) => { console.log(value); return value; })
                .then((value) => {setLoading(false); toast(value.message);})
                .catch(err => {setError(err); setLoading(false); toast.error(err.message);});
        }

        await asyncFetch();
    }

    if (error) return;
    return (
        <form onSubmit={(event) => onSubmit(event, USER_ID_URI, userId)}>
            <label forhtml="userId" className="form-label">User Id</label>
            <input id="userId" className="form-control" type="number" value={userId} onChange={(event) => { setUserId(event.target.value) }}></input>
            <input type="submit" className="form-control btn btn-primary" value="Submit" />
            {!loading && data && data.user &&
                (<table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Position</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.user && (<tr key={data.user.id}>
                            <td>{data.user.name}</td>
                            <td>{data.user.email}</td>
                            <td>{data.user.phone}</td>
                            <td>{data.user.position.name}</td>
                            <td><img className="user-image" src={`data:image/jpg;base64,${new Buffer.from(data.user.photo.data).toString('base64')}`} alt="" /></td>
                        </tr>)}
                    </tbody>
                </table>)
            }
            {loading && (<p>Loading...</p>)}
        </form>
    );
}

export default GetUserDialog;
