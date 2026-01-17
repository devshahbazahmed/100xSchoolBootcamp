import Button from "../Form/Button/Button";
import "./Table.css";

function Table() {
    return (
        <div className="table-section">
            <div className="table-container">
                <table className="table">
                    <tr>
                        <th>Pet Name</th>
                        <th>Pet Type</th>
                        <th>Breed</th>
                        <th>Adopter Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    <tr>
                        <td>Buddy</td>
                        <td>Dog</td>
                        <td>Golden Retriever</td>
                        <td>John Doe</td>
                        <td>johndoe@gmail.com</td>
                        <td>1234567890</td>
                    </tr>

                </table>
            </div>
            <Button className="back-button">Go Back</Button>
        </div>
    );
}

export default Table;