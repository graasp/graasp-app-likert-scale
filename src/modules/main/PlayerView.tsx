import Container from '@mui/material/Container';

import { PLAYER_VIEW_CY } from '@/config/selectors';

import { UserAnswersProvider } from '../context/UserAnswersContext';
import MCQView from '../mcq/MCQView';

const PlayerView = (): JSX.Element => (
  <Container data-cy={PLAYER_VIEW_CY}>
    <UserAnswersProvider>
      <MCQView />
    </UserAnswersProvider>
  </Container>
);
export default PlayerView;
