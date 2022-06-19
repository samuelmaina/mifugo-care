export const InputField = (props) => {
  return (
    <input
      style={{ width: props.width }}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.setField(e.target.value);
      }}
    />
  );
};

export const SelectField = (props) => {
  let value = localStorage.getItem("group");

  if (value === null) {
    value = "group1";
  }

  if (value !== props.selected && props.selected !== "") {
    value = props.selected;
    localStorage.setItem("group", value);
  }

  return (
    <select
      name="userClasses"
      data-testid="selector"
      onChange={(e) => {
        props.setGroup(e.target.value);
      }}
      style={{
        fontSize: "1.5rem",
      }}
      value={value}
    >
      <option value="vet">Vet officer</option>
      <option value="client">Client</option>
    </select>
  );
};

export const Links = () => {
  return (
    <ul>
      <li>
        <a href="/client/homepage">Vet News</a>
      </li>
      <li>
        <a href="/client/homepage"> Ratings</a>
      </li>
      <li>
        <a href="/client/homepage">Payment</a>
      </li>
    </ul>
  );
};
