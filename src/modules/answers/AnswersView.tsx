import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import useUserAnswers from '../context/UserAnswersContext';
import UserAnswerRow from './UserAnswerRow';

const AnswersView: FC = () => {
  const { t } = useTranslation('translations', { keyPrefix: 'ANSWERS' });
  const { allAnswersAppData } = useUserAnswers();
  return (
    <Stack spacing={2}>
      <Typography variant="h1">{t('TITLE')}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="answers table">
          <TableHead>
            <TableRow>
              <TableCell>{t('TABLE.MEMBER_HEAD')}</TableCell>
              <TableCell>{t('TABLE.KEY_HEAD')}</TableCell>
              <TableCell>{t('TABLE.LABEL_HEAD')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAnswersAppData &&
              allAnswersAppData.map((userAnswerAppData, index) => (
                <UserAnswerRow
                  key={index}
                  userAnswerAppData={userAnswerAppData}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default AnswersView;
