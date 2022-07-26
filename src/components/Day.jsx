import { BsCircleFill } from "react-icons/bs";

function Day({ day, data }) {
  const className = `md:card md:card-body ${
    day.value === "padding" ? "" : "shadow-md card-title"
  }`;

  return (
    data && (
      <div className={className}>
        {day.value === "padding" ? "" : day.value}
        {data.map((obj) => {
          if (obj.date === day.date) {
            return (
              <>
                <p className="text-xs holiday">{obj.localName}</p>
                <BsCircleFill size={14} className="holiday-circle" />
              </>
            );
          }
        })}
      </div>
    )
  );
}

export default Day;
