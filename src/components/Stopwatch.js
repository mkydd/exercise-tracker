import { createTimeModel, useTimeModel } from "react-compound-timer";

// Create model, provide your own options object if needed
const stopwatch = createTimeModel();

export const Stopwatch = () => {
  // Use this model in any components with useTimeModel hook
  const { value } = useTimeModel(stopwatch);

  return (
    <div>
      <div>
      {value.h > 0 && value.h < 10 ? 0 : null}{value.h > 0 ? <div>:{value.h}</div> : null}
      
      {value.m < 10 ? 0 : null}{value.m}
      :
      {value.s < 10 ? 0 : null}{value.s}
      </div>
    </div>
  );
};
