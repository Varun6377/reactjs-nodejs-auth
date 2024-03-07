import StaticTable from "./StaticTable";

const ParentComponent = () => {
  const data = [
    {
      name: "Micheal Holz",
      dateCreated: "04/10/2013",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Paula Wilson",
      dateCreated: "05/08/2013",
      role: "Publisher",
      status: "Active",
    },
    {
      name: "Antonio Moreno",
      dateCreated: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
    },
    {
      name: "Mary Savelery",
      dateCreated: "06/09/2016",
      role: "Reviewer",
      status: "Active",
    },
    {
      name: "Martin Sommer",
      dateCreated: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
    },
  ];

  return <StaticTable data={data} />;
};

export default ParentComponent;
