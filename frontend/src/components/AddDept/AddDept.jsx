import { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import axios from "axios";
import { createDepts, fetchDepts } from "../../api/Depts";
import Table from "../Table/Table";

function AddDept() {
  const [deptDetails, setDeptDetails] = useState({
    name: "",
    type: "", 
    mobile: "",
    mobile2: "",
    website: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    image: "",
  });
  const [types, setFetchTypes] = useState(null);
  const [depts, setFetchDepts] = useState(null);
  const [users, setFetchUsers] = useState(null);

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

    async function fetchUsers() {
      let data;
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/vehicles`)
        .then(function (response) {
          console.log(response.data);
          data = response.data;
          setFetchUsers(data);
          console.log(users);
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
          console.log("DEPTS", depts);
        })
        .catch((error) => console.log("error", error));
    }
    fetchTypes();
    fetchUsers();
    fetchDepts();
  }, []);

  function handleChange(event) {
    let key = event.target.name;
    setDeptDetails({ ...deptDetails, [key]: event.target.value });
  }

  const handleImage = (e) => {
    setDeptDetails({ ...deptDetails, image: e.target.files[0] });
  };

  function handleChangeType(e) {
    setDeptDetails({ ...deptDetails, type: e.target.value });
  }
  function handleChangeParent(e) {
    setDeptDetails({ ...deptDetails, parent: e.target.value });
  }

  const handleCreateDept = () => {
    const formData = new FormData();
    formData.append("name", deptDetails.name);
    formData.append("type", deptDetails.type);
    formData.append("image", deptDetails.image);
     formData.append("mobile", deptDetails.mobile);
    formData.append("mobile2", deptDetails.mobile2);
    formData.append("website", deptDetails.website);
    formData.append("email", deptDetails.email);
    formData.append("address1", deptDetails.address1);
    formData.append("address2", deptDetails.address2);
    formData.append("city", deptDetails.city);
    formData.append("pincode", deptDetails.pincode);
    formData.append("state", deptDetails.state);

    if(deptDetails.name?.type?.image?.mobile?.website?.email?.address1?.address2?.city?.pincode?.state)
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/stations`, formData)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (<div className="px-12 h-screen  ">
  {/* The button to open modal */}
  <label htmlFor="my-modal" className="btn btn-primary ml-auto">
    Add new
  </label>

  {/* Put this part before </body> tag */}
  <input type="checkbox" id="my-modal" className="modal-toggle" />
  <div className="modal ">
    <div className="modal-box bg-slate-100   ">
      <div className=" gap-4  grid grid-cols-2">
        <input
          type={"file"}
          accept=".png, .jpg, .jpeg, "
          onChange={handleImage}
          name="image"
          className="file-input file-input-bordered w-full col-span-2" 
        />
         <input
          type="text"
          value={deptDetails?.name}
          onChange={handleChange}
          name="name"
          placeholder="Name"
          className="input input-bordered   w-full col-span-2"
        />

        <select
          className="select  select-bordered w-full  "
          onChange={(e) => handleChangeType(e)}
          name={"type"}
        >
          <option selected disabled>
            {"Select Type"}
          </option>
          {types?.length > 0
            ? types.map((option, key) => {
                return (
                  <option key={key} value={option.id}>
                    {option.name}
                  </option>
                );
              })
            : null}
        </select>

        

        <input
          type="text"
          value={deptDetails.mobile}
          placeholder="Mobile"
          onChange={handleChange}
          name="mobile"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.mobile2}
          placeholder="Mobile 2"
          onChange={handleChange}
          name="mobile2"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.website}
          placeholder="Website"
          onChange={handleChange}
          name="website"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.email}
          placeholder="Mail ID"
          onChange={handleChange}
          name="email"
          className="input input-bordered   w-full  col-span-2"
        />
        <input
          type="text"
          value={deptDetails.address1}
          placeholder="Address Line 1"
          onChange={handleChange}
          name="address1"
          className="input input-bordered   w-full  col-span-2"
        />
        <input
          type="text"
          value={deptDetails.address2}
          placeholder="Address Line 2"
          onChange={handleChange}
          name="address2"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.city}
          placeholder="City"
          onChange={handleChange}
          name="city"
          className="input input-bordered   w-full  "
        />
        <input
          type="text"
          value={deptDetails.pincode}
          placeholder="Pin Code"
          onChange={handleChange}
          name="pincode"
          className="input input-bordered   w-full  "
        />
        <Dropdown
          options={[{ name: "UP" }, { name: "Bihar" }]}
          placeholder={"Select State"}
          onChange={handleChange}
          name="state"
        />
        </div>
        <div className="modal-action">
        <button className="btn btn-primary" onClick={() => handleCreateDept()}>
          Save
        </button>  <label
                  htmlFor="my-modal"
                  className="btn  text-error btn-error btn-ghost"
                >
                  cancel
                </label>
      </div>
      </div>
    </div> <div className="h-full  mt-2 space-y-2">
        <Table data={depts} />
      </div></div>
  );
}

export default AddDept;
