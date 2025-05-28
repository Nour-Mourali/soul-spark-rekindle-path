
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to login page
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Index;
