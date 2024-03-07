import { Table } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const StaticTable = ({ data }) => {
  const getDotColor = (role) => {
    switch (role) {
      case "Active":
        return "green";
      case "Suspended":
        return "red";
      case "Inactive":
        return "yellow";
    }
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-primary">#</th>
            <th className="text-primary">Name</th>
            <th className="text-primary">Date Created</th>
            <th className="text-primary">Role</th>
            <th className="text-primary">Status</th>
            <th className="text-primary">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="text-primary">{item.name}</td>
              <td>{item.dateCreated}</td>
              <td>{item.role}</td>
              <td>
                {" "}
                <GoDotFill
                  style={{ color: getDotColor(item.status), fontSize: "1.1em" }}
                />
                {item.status}
              </td>
              <td>
                <IoMdSettings className="text-primary fs-4 me-2" />{" "}
                <MdCancel className="text-danger fs-4" />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StaticTable;
