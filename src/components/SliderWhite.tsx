import { Slider, rem } from '@mantine/core';
import { IconGripHorizontal } from '@tabler/icons-react';
import classes from '../CSS/SliderWhite.module.css';

export default function SliderWhite() {
  return (
      <Slider
      classNames={{
        thumb: classes.thumb 
      }}
      thumbChildren={
          <IconGripHorizontal style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      }
      defaultValue={40}
      label={null}
      />
  );
}