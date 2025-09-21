import React from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Shield, Truck, Users, QrCode, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/agri-hero.jpg';

interface HomeProps {
  onRegister: () => void;
  onLogin: () => void;
}

export const Home: React.FC<HomeProps> = ({ onRegister, onLogin }) => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Immutable records ensure complete transparency and trust in the supply chain'
    },
    {
      icon: QrCode,
      title: 'Full Traceability',
      description: 'Track produce from farm to table with detailed ownership history'
    },
    {
      icon: Users,
      title: 'Multi-Stakeholder',
      description: 'Connects farmers, distributors, and retailers in one unified platform'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Farm Registration',
      description: 'Farmers register their produce with quality grades and pricing'
    },
    {
      number: '02',
      title: 'Distribution',
      description: 'Distributors receive and transport produce to retail locations'
    },
    {
      number: '03',
      title: 'Retail Sale',
      description: 'Retailers sell to consumers with complete supply chain visibility'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-20 container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <span className="text-white/90 text-lg font-medium">AgriTrace</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transparent
              <span className="block text-accent-light">Agriculture</span>
              Supply Chain
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Revolutionary blockchain-based platform that ensures complete traceability 
              from farm to table, connecting farmers, distributors, and retailers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton
                variant="hero"
                size="xl"
                onClick={onRegister}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started
              </GradientButton>
              
              <GradientButton
                variant="outline"
                size="xl"
                onClick={onLogin}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Sign In
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose AgriTrace?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets agricultural transparency for a more 
              trustworthy and efficient supply chain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process that ensures transparency and 
              accountability throughout the agricultural supply chain.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 transform translate-x-8">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, distributors, and retailers who trust 
            AgriTrace for transparent and secure agricultural supply chains.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton
              variant="hero"
              size="xl"
              onClick={onRegister}
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Your Journey
            </GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
};