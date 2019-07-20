const Test = ({ test, deleteTestOf }) => {
  return (

    <tr>
      <td>
        {test.id}
      </td>
      <td>
        {test.name}
      </td>
      <td>
        {test.units}
      </td>
      <td>
        {test.min}
      </td>
      <td>
        {test.max}
      </td>
      <td>
        <button onClick={deleteTestOf(test.id)}>delete</button>
      </td>
    </tr>

  )
}