import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { Package, Send, Eye } from 'lucide-react';
import { ProduceList } from '@/components/produce/ProduceList';
import { TransferForm } from '@/components/produce/TransferForm';
import { useAuth } from '@/contexts/AuthContext';
import { Produce } from '@/types/produce';

type View = 'dashboard' | 'list' | 'transfer';

export const DistributorDashboard: React.FC = () => {
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

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Produce</h2>
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
        targetRole="retailer"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Distributor Dashboard</h2>
          <p className="text-muted-foreground">Manage produce distribution and supply chain logistics</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setCurrentView('list')}>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-300">
                <Package className="h-6 w-6 text-white" />
              </div>
              <CardTitle>All Produce</CardTitle>
              <CardDescription>View all produce in your inventory and track their journey</CardDescription>
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
              <CardDescription>Transfer produce to retailers for final sale</CardDescription>
            </CardHeader>
            <CardContent>
              <GradientButton variant="warning" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Transfer to Retailer
              </GradientButton>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Current produce in your distribution network</CardDescription>
          </CardHeader>
          <CardContent>
            {produces.length > 0 ? (
              <div className="space-y-3">
                {produces.map((produce) => (
                  <div key={produce.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{produce.produceType}</p>
                      <p className="text-sm text-muted-foreground">
                        From: {produce.farmer} • Origin: {produce.origin}
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
                No produce in your inventory yet. Receive produce from farmers to get started!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};