import { Buffer } from "buffer";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';

const TOKEN_URI = "https://abz-application.herokuapp.com/api/v1/token";
const USER_ID_URI = "https://abz-application.herokuapp.com/api/v1/users/";

function GetUserDialog() {
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();

    const onSubmitEvent = async (event) => {
        let uri = USER_ID_URI;

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
                    if (response.ok) return response.json();
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
                    if (response.ok) return response.json();
                    else throw new Error(`${response.status} ${response.statusText}`);
                })
                .then((value) => { setData(value); return value; })
                .then((value) => { console.log(value); return value; })
                .then((value) => { setLoading(false); toast(value.message); })
                .catch(err => { setError(err); setLoading(false); toast.error(err.message); });
        }

        await asyncFetch();
    }

    if (error) return;
    return (
        <Form>
            <Form.Group as={Col} className="mb-3" xs={4}>
                <Form.Label htmlFor="userId" className="form-label">User Id</Form.Label>
                <Form.Control id="userId" className="form-control" type="number" value={userId} onChange={(event) => { setUserId(event.target.value) }}></Form.Control>
            </Form.Group>
            <Button as={Col} type="submit" xs={2} className="mb-3 btn btn-primary" onClick={onSubmitEvent}>Submit</Button>
            {!loading && data && data.user &&
                (<Table className="table table-striped">
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
                </Table>
                )
            }
            {loading && (<div>
                <div className="filler">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            </div>)}
        </Form>
    );
}

export default GetUserDialog;
