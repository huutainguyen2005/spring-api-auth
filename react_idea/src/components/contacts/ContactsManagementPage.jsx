import {useState} from "react";
import {Form, Table} from "react-bootstrap";

export function ContactsManagementPage() {
    // BAI TAP
    // 2. Tao 1 state la contacts gia tri luc khoi tao []
    // 3. Form submit -> gom formData, push vao 1 mang (contacts)
    // 4.1 Dem table tu bai 4_js qua react component
    // 4.2 Tu contacts, cap nhat lai danh sach

    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        addr: '',
        dob: ''
    });
    const [contacts, setContacts] = useState([]);
    //        ^                 ^
    //       state           setState
    // setState -> bao hieu cho react re-render lai UI

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(fullname);
        // console.log(phone);
        console.log(formData);

        // push them formData vao state `contacts` -> hoạt động, nhưng UI bị freeze
        // contacts.push(formData);

        // Chủ động gọi lại setState để re-render lại UI: setContacts
        setContacts([...contacts, formData]);
        setFormData({
            fullname: '',
            addr: '',
            phone: '',
            dob: ''
        });
        console.log(contacts);
    };

    // const handleInputChange = (field, value) => {
    //     // ... -> spread operator
    //     setFormData((prevState) => ({...prevState, [field]: value}))
    // };
    function handleInputChange(field, value) {
        setFormData((prevState) => ({...prevState, [field]: value}))
    }

    return (
        <div className="container">
            <h1 className="mb-4">Contact Manager</h1>
            <div className="card mb-4">
                <div className="card-header">Add New Contact</div>
                <div className="card-body">
                    <Form id="contactForm" onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Label htmlFor="name" className="form-label">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={formData.fullname}
                                    onChange={(e) => {
                                        handleInputChange('fullname', e.target.value)
                                    }}
                                    // value={fullname}
                                    // onChange={(e) => {
                                    //     setFullname(e.target.value)
                                    // }}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <Form.Label htmlFor="tel" className="form-label">Phone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    className="form-control"
                                    id="tel"
                                    required
                                    // value={phone}
                                    // onChange={(e) => {
                                    //     setPhone(e.target.value)
                                    // }}
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData((prevState) => ({...prevState, phone: e.target.value}))
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <Form.Label htmlFor="address" className="form-label">Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={formData.addr}
                                    onChange={(e) => {
                                        setFormData((prevState) => ({...prevState, addr: e.target.value}))
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dob" className="form-label"
                                >Date of Birth</label
                                >
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dob"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            id="submitBtn"
                            onClick=""
                        >
                            Add
                        </button>
                    </Form>
                </div>
            </div>
            <div className="card">
                <div className="card-header">Contact List</div>
                <div className="card-body">
                    <Table className="table table-bordered table-striped">
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Date of Birth</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody id="contactTableBody">
                        {
                            contacts.length === 0 ?
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No contacts yet.
                                    </td>
                                </tr> :
                                contacts.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{contact.fullname}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.addr}</td>
                                        <td>{contact.dob}</td>
                                        <td>Edit | Delete</td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}