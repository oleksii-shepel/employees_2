import { Buffer } from "buffer";

function Table({ data }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th>Photo</th>
                </tr>
            </thead>
            <tbody>
                {!!data.users && data.users.map(item => {
                    let buffer = !item.photo ? new Buffer.from([]) : new Buffer.from(item.photo.data);
                    let base64 = buffer.toString('base64');
                    return (<tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.position.name}</td>
                        <td><img className="user-image" src={`data:image/jpg;base64,${base64}`} alt="" /></td>
                    </tr>);
                })}
            </tbody>
        </table>);
}

export default Table;
