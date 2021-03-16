export const InputField = (props) => {
  return (
    <input
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
  return (
    <select
      name="userClasses"
      onChange={(e) => {
        props.setGroup(e.target.value);
      }}
    >
      <option value="group1">Join as a freelance...</option>
      <option value="group2">Vet officer</option>
      <option value="group3">Agriculturalist</option>
      <option value="group4">Client</option>
    </select>
  );
};
