import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package2, DollarSign, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddProduceFormProps {
  onSubmit: (data: {
    produceType: string;
    quality: string;
    price: number;
  }) => void;
  onCancel: () => void;
}

export const AddProduceForm: React.FC<AddProduceFormProps> = ({ onSubmit, onCancel }) => {
  const [produceType, setProduceType] = useState('');
  const [quality, setQuality] = useState('');
  const [price, setPrice] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!produceType || !quality || !price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      produceType,
      quality,
      price: priceNum,
    });

    toast({
      title: "Success!",
      description: "Produce added successfully to the blockchain",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">Add New Produce</h2>
          <p className="text-muted-foreground">Register your agricultural produce to the blockchain</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-success to-accent rounded-lg">
                <Package2 className="h-5 w-5 text-white" />
              </div>
              Produce Details
            </CardTitle>
            <CardDescription>
              Enter the details of your agricultural produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="produceType">Produce Type</Label>
                  <Select value={produceType} onValueChange={setProduceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select produce type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tomato">Tomato</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="onion">Onion</SelectItem>
                      <SelectItem value="carrot">Carrot</SelectItem>
                      <SelectItem value="cabbage">Cabbage</SelectItem>
                      <SelectItem value="spinach">Spinach</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="mango">Mango</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Grade</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Unit (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <GradientButton
                  type="submit"
                  variant="success"
                  size="lg"
                  className="flex-1"
                >
                  <Package2 className="h-4 w-4 mr-2" />
                  Register Produce
                </GradientButton>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};