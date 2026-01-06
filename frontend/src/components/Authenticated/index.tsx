import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = (props: { children: any }) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to="/account/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node
};

export default Authenticated;
