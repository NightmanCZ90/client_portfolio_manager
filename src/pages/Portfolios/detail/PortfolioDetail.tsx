import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { RestApiError } from '../../../services/ApiClient';
import RestApiClient from '../../../services/RestApiClient';
import { Portfolio } from '../../../types/portfolio';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Portfolio, RestApiError>(['portfolioDetail', Number(id)], () => RestApiClient.getPortfolio(Number(id)), {
    onError: (error) => { console.error(error) },
  });

  if (isLoading) return <div>Loading</div>;

  if (!data) return <div>Nothing to display</div>;

  return (
    <div>
      <h1>Portfolio Detail {id}</h1>
      <h2>{data.name}</h2>
    </div>
  )
}

export default PortfolioDetail;
