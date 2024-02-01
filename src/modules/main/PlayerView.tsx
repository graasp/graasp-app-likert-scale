import Container from '@mui/material/Container';

import { PLAYER_VIEW_CY } from '@/config/selectors';

import { UserAnswersProvider } from '../context/UserAnswersContext';
import ItemView from '../likertItem/ItemView';

const PlayerView = (): JSX.Element => (
  <Container data-cy={PLAYER_VIEW_CY}>
    <UserAnswersProvider>
      <ItemView />
    </UserAnswersProvider>
  </Container>
);
export default PlayerView;
