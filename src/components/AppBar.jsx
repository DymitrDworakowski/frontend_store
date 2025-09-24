import useAuth from '../hooks/useAuth';
import UserMenu from './UserMenu';
import AuthNav from './AuthNav'; 


 function AppBar () {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>   
  );
};
export default AppBar;