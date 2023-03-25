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
    text: 'EXPLORE BUCKETS',
    icon: () => <FixedRatesIcon />,
    title: 'Explore Buckets',
    subtitle: 'Invest in existing buckets or create a custom bucket'
  },
  {
    link: '/my-portfolio',
    text: 'MY PORTFOLIO',
    icon: () => <DepositIcon />,
    title: 'My Portfolio',
    subtitle: 'View your investments',
    patterns: [/new-bucket/]
  }
];
