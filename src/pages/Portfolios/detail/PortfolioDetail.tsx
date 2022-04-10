import { useParams } from 'react-router-dom';

const PortfolioDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div>Portfolio Detail {id}</div>
  )
}

export default PortfolioDetail;
