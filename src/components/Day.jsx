function Day({ day, data }) {
  const className = `card card-body ${
    day.value === "padding" ? "" : "shadow-md"
  }`;

  return (
    data && (
      <div className={className}>
        {day.value === "padding" ? "" : day.value}
        {data.map((obj) => {
          if (obj.date === day.date) {
            return <p>{obj.localName}</p>;
          }
        })}
      </div>
    )
  );
}

export default Day;
