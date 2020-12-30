import React, { useState } from "react";
import { marks } from "../../../../constants/pairwiseMarks";
import { Grid } from "@material-ui/core";
import { Slider } from "../_styledCurtail";

export default function CurtailSlider(props) {
  const {
    clusterFocus,
    dataKey,
    value,
    updatePairwiseValues,
    parentCriteriaName,
  } = props;
  const [sliderVal, setSliderVal] = useState(value);

  return (
    <div>
      <Grid container xs={12}>
        <Grid item xs={2}>
          Less
        </Grid>
        <Grid item xs={8}>
          {dataKey}
        </Grid>
        <Grid item xs={2}>
          More
        </Grid>
      </Grid>
      <Slider
        value={sliderVal < 1 && sliderVal !== 0 ? -1 / sliderVal : sliderVal}
        min={-10}
        max={10}
        step={null}
        marks={marks}
        scale={(x) => (x < 0 ? x * -1 : x)}
        aria-labelledby={clusterFocus}
        valueLabelDisplay="auto"
        color="primary"
        onChangeCommitted={(event, sliderVal) =>
          updatePairwiseValues(event, sliderVal, parentCriteriaName, dataKey)
        }
        onChange={(e, val) => setSliderVal(val < 1 ? -(1 / val) : val)}
      />
    </div>
  );
}
