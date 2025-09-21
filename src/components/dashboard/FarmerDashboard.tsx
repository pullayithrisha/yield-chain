import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { Plus, Package, Send, Eye } from 'lucide-react';
import { AddProduceForm } from '@/components/produce/AddProduceForm';
import { ProduceList } from '@/components/produce/ProduceList';
import { TransferForm } from '@/components/produce/TransferForm';
import { useAuth } from '@/contexts/AuthContext';
import { Produce } from '@/types/produce';

type View = 'dashboard' | 'add' | 'list' | 'transfer';

export const FarmerDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [produces, setProduces] = useState<Produce[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadProduces();
  }, []);

  const loadProduces = () => {
    const allProduces = JSON.parse(localStorage.getItem('agriTrace_produces') || '[]');
    const userProduces = allProduces.filter((p: Produce) => p.currentOwner === user?.principal);
    setProduces(userProduces);
  };

  const handleAddProduce = (produceData: any) => {
    const allProduces = JSON.parse(localStorage.getItem('agriTrace_produces') || '[]');
    const newId = allProduces.length + 1;
    
    const newProduce: Produce = {
      id: newId,
      farmer: user?.name || '',
      produceType: produceData.produceType,
      origin: user?.origin || '',
      quality: produceData.quality,
      price: produceData.price,
      currentOwner: user?.principal || '',
      registeredTime: Date.now(),
      history: [{
        timestamp: Date.now(),
        from: null,
        to: user?.principal || '',
        details: 'Produce registered by farmer'
      }]
    };

    allProduces.push(newProduce);
    localStorage.setItem('agriTrace_produces', JSON.stringify(allProduces));
    loadProduces();
    setCurrentView('dashboard');
  };

  if (currentView === 'add') {
    return <AddProduceForm onSubmit={handleAddProduce} onCancel={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Produce</h2>
            <Button onClick={() => setCurrentView('dashboard')}>Back to Dashboard</Button>
          </div>
          <ProduceList produces={produces} showTransferButton />
        </div>
      </div>
    );
  }

  if (currentView === 'transfer') {
    return (
      <TransferForm 
        produces={produces} 
        onTransfer={() => {
          loadProduces();
          setCurrentView('dashboard');
        }} 
        onCancel={() => setCurrentView('dashboard')}
        targetRole="distributor"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Farmer Dashboard</h2>
          <p className="text-muted-foreground">Manage your agricultural produce and track the supply chain</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setCurrentView('add')}>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success to-accent flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Add Produce</CardTitle>
              <CardDescription>Register new agricultural produce to the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <GradientButton variant="success" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Produce
              </GradientButton>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setCurrentView('list')}>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <CardTitle>My Produce</CardTitle>
              <CardDescription>View all produce you've registered and track their status</CardDescription>
            </CardHeader>
            <CardContent>
              <GradientButton variant="hero" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Produce ({produces.length})
              </GradientButton>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setCurrentView('transfer')}>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-warning to-accent flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-300">
                <Send className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Transfer Produce</CardTitle>
              <CardDescription>Transfer produce ownership to distributors</CardDescription>
            </CardHeader>
            <CardContent>
              <GradientButton variant="warning" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Transfer to Distributor
              </GradientButton>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest produce activities</CardDescription>
          </CardHeader>
          <CardContent>
            {produces.length > 0 ? (
              <div className="space-y-3">
                {produces.slice(0, 3).map((produce) => (
                  <div key={produce.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{produce.produceType}</p>
                      <p className="text-sm text-muted-foreground">
                        Registered on {new Date(produce.registeredTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">₹{produce.price}</p>
                      <p className="text-sm text-muted-foreground">{produce.quality}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No produce registered yet. Add your first produce to get started!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};