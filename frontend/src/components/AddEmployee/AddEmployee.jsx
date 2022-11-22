import { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { createDepts, fetchDepts } from "../../api/Depts";
import Table from "../Table/Table";
function AddEmployee() {
  const [employeeDetails, setEmpDetails] = useState({
    name: "",
    type: "",
    parent: "",
    mobile: "",
    mobile2: "",
    website: "",
    email: "",
    image: "",
  });

  const [employees, setFetchEmployees] = useState();

  const [types, setFetchTypes] = useState(null);
  const [depts, setFetchDepts] = useState(null);
  const [users, setFetchUsers] = useState(null);

  const wheels = [{
    id:1,name: "Two"
  },{id:2,name:"Three"},{id:2,name:"Four"}]

  const brands = [{
    id:1,name: "TATA"
  },{id:2,name:"Tesla"},{id:3,name:"Kia"},{id:4,name:"Hyundai"},{id:5,name:"Mercedes"},{id:6,name:"BMW"},{id:7,name:"Mahindra"},{id:8,name:"Toyota"},{id:9,name:"Kia"}
,{id:10,name:"Revolt"},{id:11,name:"Ather"},{id:12,name:"Miracle5"},{id:13,name:"Ola"},{id:14,name:"Honda"},{id:15,name:"Torq"},{id:16,name:"Ultraviollete"}]


  const updateEmployees = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/vehicles`)
      .then(function (response) {
        console.log(response.data);
        setFetchEmployees(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    async function fetchTypes() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/types`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchTypes(data);
          console.log(types);
        })
        .catch((error) => console.log("error", error));
    }

    async function fetchDepts() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/stations`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchDepts(data);
          console.log("Stations", depts);
        })
        .catch((error) => console.log("error", error));
    }
    fetchTypes();

    fetchDepts();
    updateEmployees();
  }, []);

  function handleChange(event) {
    let key = event.target.name;
    setEmpDetails({ ...employeeDetails, [key]: event.target.value });
  }

  const handleImage = (e) => {
    setEmpDetails({ ...employeeDetails, image: e.target.files[0] });
  };

  function handleChangeCharger(e) {
    setEmpDetails({ ...employeeDetails, charger: e.target.value });
  } function handleChangeBrand(e) {
    setEmpDetails({ ...employeeDetails, brand: e.target.value });
  }
  function handleChangeWheels(e) {
    setEmpDetails({ ...employeeDetails, wheels: e.target.value });
  }

  const handleCreateEmployee = () => {
    console.log("Create New Vehicle... Requesting");
    const formData = new FormData();
    formData.append("name", employeeDetails.name);
    formData.append("charger", employeeDetails.charger);
    formData.append("image", employeeDetails.image);
    formData.append("wheels", employeeDetails.wheels);
    formData.append("battery", employeeDetails.battery);
    formData.append("brand", employeeDetails.brand);
    formData.append("model", employeeDetails.model);
 

    if (employeeDetails.name && employeeDetails.charger && employeeDetails.battery)
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/vehicles`, formData)
        .then(function (response) {
          console.log(response.data);
          alert("Vehicle added successfully");
          updateEmployees();
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    
  };
  return (
    <div className="px-12 h-screen  ">
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn btn-primary ml-auto">
        Add new
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-slate-100   ">
          <div className="  gap-4  grid grid-cols-2 w-full   mx-auto  rounded-xl ">
            <div className=" w-full col-span-2  mx-auto  rounded-xl">
              <div className="   gap-4  grid grid-cols-2">
                <input
                  type={"file"}
                  accept=".png, .jpg, .jpeg, "
                  onChange={handleImage}
                  name="image"
                  className="file-input file-input-bordered w-full  col-span-2"
                />
                <select
                  className="select  select-bordered w-full  "
                  name={"wheels"}
                  onChange={(e) => handleChangeWheels(e)}
                >
                  <option selected disabled>
                    {"Select Wheels Count"}
                  </option>
                  {wheels?.length > 0
                    ? wheels.map((option, key) => {
                        return (
                          <option key={key} value={option.name}>
                            {option.name}
                          </option>
                        );
                      })
                    : null}
                </select>
                <select
                  className="select  select-bordered w-full   "
                  name={"brand"}
                  onChange={(e) => handleChangeBrand(e)}
                >
                  <option selected disabled>
                    {"Select Vehicle Brand"}
                  </option>
                  {brands?.length > 0
                    ? brands.map((option, key) => {
                        return (
                          <option key={key} value={option.name}>
                            {option.name}
                          </option>
                        );
                      })
                    : null}
                </select>
                <input
                  type="text"
                  value={employeeDetails?.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered   w-full "
                />
 <input
                  type="text"
                  value={employeeDetails?.model}
                  onChange={handleChange}
                  name="model"
                  placeholder="Model"
                  className="input input-bordered   w-full  "
                />
                <select
                  className="select  select-bordered w-full  "
                  onChange={(e) => handleChangeCharger(e)}
                  name={"charger"}
                >
                  <option selected disabled>
                    {"Select Charger Type"}
                  </option>
                  {types?.length > 0
                    ? types.map((option, key) => {
                        return (
                          <option key={key} value={option.name}>
                            {option.name}
                          </option>
                        );
                      })
                    : null}
                </select>

                <input
                  type="text"
                  value={employeeDetails?.battery}
                  onChange={handleChange}
                  name="battery"
                  placeholder="Battery Size in kWh"
                  className="input input-bordered   w-full col-span-1"
                />

                

                
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-success"
                  onClick={() => handleCreateEmployee()}
                >
                  Save
                </button>{" "}
                <label
                  htmlFor="my-modal"
                  className="btn  text-error btn-error btn-ghost"
                >
                  cancel
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full  mt-2 space-y-2">
        <Table data={employees} />
      </div>
    </div>
  );
}

export default AddEmployee;
