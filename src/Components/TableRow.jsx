function TableRow(props) {
  //console.log(props);
  const { project_name, project_link, project_id, bid_value, deal_status } =
    props?.project;

  const greenCounterFunction  = props?.greenCounterFunction;
  console.log(greenCounterFunction());
 
  const checkboxValues = props?.checkboxValues;
  //console.log(checkboxValues);




  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <th></th>
      {checkboxValues &&
        checkboxValues.map((value,index) => {
          //console.log(value);
          if(value == 'Project Link'){
          return <td key={index}>{project_link}</td>}
          
          if(value == 'Project Id'){
          return <td key={index}>{project_link}</td>}
        
          if(value == 'Project Name'){
          return <td key={index}>{project_link}</td>}
         
          if(value == 'Bid Value'){
          return <td key={index}>{project_link}</td>}
          
            
        }

      )}
      <td>
        {deal_status === "1" ? (
          // calling greenCounterFunction to count green badge
            // greenCounterFunction() &&
            <p className="bg-green-600">Converted to deal</p>
        ) : (
          <p className="bg-red-600">Not converted to deal</p>
        )}</td>
    </tr>
  );
}

export default TableRow;
