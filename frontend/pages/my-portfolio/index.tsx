import MyPortfolioComponent from 'components/MyPortfolio';
import CommonLayout from 'layouts/CommonLayout';
import Title from 'components/Common/Title';

export default function MyBuckets() {
  return (
    // main page content
    <>
      <Title titleText="My Portfolio | Vault Aggregator" />
      <MyPortfolioComponent />
      {/* common layout contains components which are universally shared in the entire UI */}
      <CommonLayout />
    </>
  );
}
