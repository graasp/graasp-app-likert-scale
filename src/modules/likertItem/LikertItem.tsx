import { FC, useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';

import { QuestionLabel } from '@graasp/ui/apps';

import { LabelPosition } from '@/config/appSettings';
import { LIKERT_LABEL_CY, makeRadioAnswerCy } from '@/config/selectors';

const LikertLabel: FC<{
  label: string;
  required: boolean;
  width?: string;
  alignRight: boolean;
}> = ({ label, required, width, alignRight }) => (
  <QuestionLabel
    width={width}
    typographyProps={{
      sx: { textAlign: alignRight ? 'right' : 'left' },
    }}
    dataCy={LIKERT_LABEL_CY}
  >
    <>
      {label}
      {required && label.length > 0 && <sup>*</sup>}
    </>
  </QuestionLabel>
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
          control={<Radio data-cy={makeRadioAnswerCy(l)} />}
          label={levelsLabels[l]}
          labelPlacement="bottom"
          sx={{ flex: '0 1 auto' }}
        />,
      );
    }
    return compArray;
  };

  const getWidthForLikertLabel = (): string =>
    labelDirection === 'column' ? 'auto' : '25%';

  const labelComp = (
    <LikertLabel
      label={label}
      required={required}
      width={getWidthForLikertLabel()}
      alignRight={labelPosition === LabelPosition.Ends}
    />
  );

  const getWidthForLikertComp = (): string => {
    if (labelDirection === 'column') {
      return 'auto';
    }
    return labelPosition === LabelPosition.Ends ? '50%' : '75%';
  };

  const likertComp = (
    <FormControl sx={{ width: getWidthForLikertComp() }}>
      <RadioGroup
        row
        // ⬇️ Give an empty string to set the component as 'controlled'.
        value={userAnswer ?? ''}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        sx={{
          flexWrap: 'nowrap',
          justifyContent: 'space-evenly',
          ml: 2,
          mr: 2,
        }}
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
        <LikertLabel
          label={secondLabel || ''}
          required={false}
          width={getWidthForLikertLabel()}
          alignRight={false}
        />
      )}
    </Stack>
  );
};

export default LikertItem;
