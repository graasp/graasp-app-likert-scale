import { ChangeEvent, FC } from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { AnswersSettings } from '@/config/appSettings';
import { makeMcqAnswersCy } from '@/config/selectors';
import { AnswerKey } from '@/interfaces/answers';
import { UserAnswer } from '@/interfaces/userAnswer';

import useUserAnswers from '../context/UserAnswersContext';

const SingleAnswer: FC<{
  userAnswer?: UserAnswer;
  answersSettings: AnswersSettings;
}> = ({ userAnswer, answersSettings }) => {
  const { answers } = answersSettings;
  const { selectAnswer } = useUserAnswers();

  const handleChange = (
    _e: ChangeEvent<HTMLInputElement>,
    newKey: AnswerKey,
  ): void => {
    selectAnswer({
      singleKey: newKey,
    });
  };

  return (
    <FormControl>
      <RadioGroup
        name="radio-group"
        onChange={handleChange}
        // ⬇️ Give an empty string to set the component as 'controlled'.
        value={userAnswer?.singleKey ?? ''}
      >
        {answers.map((answer, index) => (
          <FormControlLabel
            data-cy={makeMcqAnswersCy(index)}
            key={index}
            value={answer.key}
            control={<Radio />}
            label={answer.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SingleAnswer;
