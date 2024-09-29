import { useNavigate } from 'react-router-dom';

const MoreButton = ({ textContent }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (textContent === 'More Farmers') {
      navigate('/farmers');
    } else if (textContent === 'More In Shop') {
      navigate('/shop');
    } else if (textContent === 'More Recipes') {
      navigate('/recipes');
    }
  };

  return (
    <button onClick={handleClick}>
      {textContent}
    </button>
  );
};

export default MoreButton;
