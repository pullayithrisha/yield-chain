import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Home } from '@/pages/Home';
import { RoleSelection } from '@/components/auth/RoleSelection';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { LoginForm } from '@/components/auth/LoginForm';
import { FarmerDashboard } from '@/components/dashboard/FarmerDashboard';
import { DistributorDashboard } from '@/components/dashboard/DistributorDashboard';
import { RetailerDashboard } from '@/components/dashboard/RetailerDashboard';
import { Role } from '@/contexts/AuthContext';

type AuthView = 'home' | 'role-selection' | 'register' | 'login';

const Index = () => {
  const { user } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('home');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // If user is logged in, show appropriate dashboard
  if (user) {
    return (
      <>
        <Header />
        {user.role === 'farmer' && <FarmerDashboard />}
        {user.role === 'distributor' && <DistributorDashboard />}
        {user.role === 'retailer' && <RetailerDashboard />}
      </>
    );
  }

  // Authentication flow
  switch (authView) {
    case 'role-selection':
      return (
        <RoleSelection
          onRoleSelect={(role) => {
            setSelectedRole(role);
            setAuthView('register');
          }}
        />
      );

    case 'register':
      return (
        <RegisterForm
          role={selectedRole!}
          onBack={() => setAuthView('role-selection')}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );

    case 'login':
      return (
        <LoginForm
          role={selectedRole!}
          onBack={() => setAuthView('role-selection')}
          onSwitchToRegister={() => setAuthView('register')}
        />
      );

    default:
      return (
        <Home
          onRegister={() => setAuthView('role-selection')}
          onLogin={() => setAuthView('role-selection')}
        />
      );
  }
};

export default Index;
