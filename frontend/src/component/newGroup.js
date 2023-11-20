import {
  handleChange,
  handleProfileChange,
  handleUserChange,
} from "../redux/slice/newGroup";
import { useDispatch, useSelector } from "react-redux";
import { newGroup } from "../redux/api/api";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";

export default (params) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.newGroup);
  const user = useSelector((state) => state.login);
  const token=window.localStorage.getItem("token")
  const handleClick = (state, action) => {
    if (group.GroupName === "") {
      alert("Fill Group Name");
    } else if (group.User.length == 0) {
      alert("At list one members is require");
    } else {
      dispatch(newGroup({ group, token: token }));
    }
  };
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    dispatch(handleUserChange(value));
  };

  return (
    <>
      <input
        type="text"
        name="GroupName"
        onChange={(e) => dispatch(handleChange(e))}
        placeholder="Group Name"
      />
      <input
        type="file"
        accept="image/*"
        name="profilePic"
        onChange={(e) => dispatch(handleProfileChange(e))}
      />
      <div>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
          <InputLabel shrink htmlFor="select-multiple-native">
            contacts
          </InputLabel>
          <Select
            multiple
            native
            value={group.User}
            onChange={handleChangeMultiple}
            label="Native"
            inputProps={{
              id: "select-multiple-native",
            }}
          >
            {user.contacts &&
              user.contacts.map(
                (data, i) =>
                  data.user_id && (
                    <option key={i} value={data.user_id}>
                      {data.Name}
                    </option>
                  )
              )}
          </Select>
        </FormControl>
      </div>
      <button onClick={handleClick}>Create Group</button>
    </>
  );
};
