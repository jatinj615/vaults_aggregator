import { ChainId } from 'enums';

import TopbarInterface from 'interfaces/topbar.interface';
import SwapIcon from 'icons/SwapIcon';
import FixedRatesIcon from 'icons/FixedRatesIcon';
import DepositIcon from 'icons/DepositIcon';
import PoolsIcon from 'icons/PoolsIcon';
import PortfolioIcon from 'icons/PortfolioIcon';

export const TopbarItems: TopbarInterface[] = [
  {
    link: '/',
    text: 'EXISTING BUCKETS',
    icon: () => <FixedRatesIcon />,
    title: 'Existing Buckets',
    subtitle: 'Edit or use existing buckets here'
  },
  {
    link: '/my-buckets',
    text: 'MY BUCKETS',
    icon: () => <DepositIcon />,
    title: 'My Buckets',
    subtitle: 'View your existing buckets or create a new bucket',
    patterns: [/new-bucket/]
  }
];
