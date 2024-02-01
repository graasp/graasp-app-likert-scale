import { FC, useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LabelPosition } from '@/config/appSettings';

const LikertLabel: FC<{ label: string; required: boolean }> = ({
  label,
  required,
}) => (
  <Typography sx={{ mb: 1 }} variant="h6">
    {label}
    {required && <sup>*</sup>}
  </Typography>
);

interface LikertItemProps {
  label: string;
  secondLabel?: string;
  labelPosition?: LabelPosition;
  levels: number;
  levelsLabels: Array<string>;
  required: boolean;
  onChange: (answer: number) => void;
  userAnswer: number | undefined;
}

const LikertItem: FC<LikertItemProps> = ({
  label,
  secondLabel,
  labelPosition,
  levels,
  levelsLabels,
  required,
  onChange,
  userAnswer,
}) => {
  const [labelDirection, setLabelDirection] = useState<'row' | 'column'>(
    'column',
  );
  const [showSecondLabel, setShowSecondLabel] = useState<boolean>(false);
  const [inverseComponentsOrder, setInverseComponentsOrder] =
    useState<boolean>(false);

  // eslint-disable-next-line no-console
  console.log(userAnswer);

  useEffect(() => {
    if (
      labelPosition === LabelPosition.Top ||
      labelPosition === LabelPosition.Bottom
    ) {
      setLabelDirection('column');
      if (labelPosition === LabelPosition.Bottom) {
        setInverseComponentsOrder(true);
      } else {
        setInverseComponentsOrder(false);
      }
    } else {
      setLabelDirection('row');
      if (labelPosition === LabelPosition.Ends) {
        setShowSecondLabel(true);
      } else if (labelPosition === LabelPosition.Right) {
        setInverseComponentsOrder(true);
      } else {
        setInverseComponentsOrder(false);
      }
    }
  }, [labelPosition]);
  const getRadios = (): JSX.Element[] => {
    const compArray: JSX.Element[] = [];
    for (let l = 0; l < levels; l += 1) {
      compArray.push(
        <FormControlLabel
          value={l}
          control={<Radio />}
          label={levelsLabels[l]}
          labelPlacement="bottom"
          sx={{ flex: '0 1 auto' }}
        />,
      );
    }
    return compArray;
  };

  const labelComp = <LikertLabel label={label} required={required} />;

  const likertComp = (
    <FormControl sx={{ flexGrow: 1, width: 'auto' }}>
      <RadioGroup
        row
        value={userAnswer}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}
      >
        {getRadios()}
      </RadioGroup>
    </FormControl>
  );

  const getComponentsInOrder = (): JSX.Element[] =>
    inverseComponentsOrder ? [likertComp, labelComp] : [labelComp, likertComp];

  return (
    <Stack
      direction={labelDirection}
      spacing={1}
      alignItems={labelDirection === 'row' ? 'center' : 'flex-start'}
      justifyContent={
        labelPosition === LabelPosition.Ends ? 'center' : 'flex-start'
      }
      flexGrow={2}
    >
      {getComponentsInOrder()}
      {showSecondLabel && (
        <LikertLabel label={secondLabel || ''} required={false} />
      )}
    </Stack>
  );
};

export default LikertItem;
