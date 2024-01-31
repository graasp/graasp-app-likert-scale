import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Typography, styled } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { UserAnswerAppData } from '@/config/appData';

import { useSettings } from '../context/SettingsContext';

const BoldWord = styled('span')({
  fontWeight: 'bold',
});
const ItalicText = styled(Typography)({
  fontStyle: 'italic',
});

const UserAnswerRow: FC<{
  userAnswerAppData: UserAnswerAppData;
}> = ({ userAnswerAppData }) => {
  const { t } = useTranslation('translations', {
    keyPrefix: 'ANSWERS.TABLE.ROW',
  });
  const { answers } = useSettings();
  const key = userAnswerAppData.data.singleKey;
  const label = answers.answers.find((a) => a.key === key)?.label;
  return (
    <TableRow>
      <TableCell>{userAnswerAppData.creator?.name}</TableCell>
      <TableCell>{key}</TableCell>
      <TableCell>
        {label ?? (
          <Alert severity="warning">
            <ItalicText variant="body1">
              {t('KEY_ERASED_WARNING.STRING_1')}
              <BoldWord>{key}</BoldWord>
              {t('KEY_ERASED_WARNING.STRING_2')}
            </ItalicText>
          </Alert>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserAnswerRow;
