import { useState } from 'react';
import { NumberInput, Slider } from '@mantine/core';
import classes from '../CSS/SliderWhite.module.css';

export default function SliderWhite(props: any) {
  const [value, setValue] = useState<number | string>(30);

  const handleAdd = () => {
    const element = {value};
    props.addToResult(element);
};

  return (
    <div className={classes.wrapper}>
      <NumberInput
        value={value}
        onChange={setValue}
        label="Newborn diapers"
        step={1}
        min={0}
        max={1000}
        hideControls
        classNames={{ input: classes.input, label: classes.label }}
        onChangeCapture={handleAdd}
      />
      <Slider
        max={1000}
        step={1}
        min={0}
        label={null}
        value={typeof value === 'string' ? 0 : value}
        onChange={setValue}
        size={2}
        className={classes.slider}
        classNames={classes}
        onChangeCapture={handleAdd}
      />
    </div>
  );
}