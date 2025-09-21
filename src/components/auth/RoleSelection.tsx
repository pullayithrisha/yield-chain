import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Tractor, Truck, Store } from 'lucide-react';
import { Role } from '@/contexts/AuthContext';

interface RoleSelectionProps {
  onRoleSelect: (role: Role) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'farmer' as Role,
      title: 'Farmer',
      description: 'Grow and manage agricultural produce',
      icon: Tractor,
      color: 'from-success to-accent',
    },
    {
      id: 'distributor' as Role,
      title: 'Distributor',
      description: 'Transport produce from farms to retailers',
      icon: Truck,
      color: 'from-primary to-accent',
    },
    {
      id: 'retailer' as Role,
      title: 'Retailer',
      description: 'Sell produce to end consumers',
      icon: Store,
      color: 'from-warning to-accent',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Role</h2>
          <p className="text-muted-foreground">Select your role in the agricultural supply chain</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <GradientButton
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => onRoleSelect(role.id)}
                >
                  Select {role.title}
                </GradientButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};