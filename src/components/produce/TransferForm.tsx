import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GradientButton } from '@/components/ui/gradient-button';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, User, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserProfile } from '@/contexts/AuthContext';
import { Produce } from '@/types/produce';

interface TransferFormProps {
  produces: Produce[];
  onTransfer: () => void;
  onCancel: () => void;
  targetRole: 'distributor' | 'retailer';
}

export const TransferForm: React.FC<TransferFormProps> = ({ 
  produces, 
  onTransfer, 
  onCancel, 
  targetRole 
}) => {
  const [selectedProduce, setSelectedProduce] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [details, setDetails] = useState('');
  const [recipients, setRecipients] = useState<UserProfile[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load potential recipients based on target role
    const allUsers = JSON.parse(localStorage.getItem('agriTrace_users') || '[]');
    const targetUsers = allUsers.filter((u: UserProfile) => u.role === targetRole);
    setRecipients(targetUsers);
  }, [targetRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduce || !selectedRecipient || !newPrice || !details) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    // Update produce ownership and history
    const allProduces = JSON.parse(localStorage.getItem('agriTrace_produces') || '[]');
    const produceIndex = allProduces.findIndex((p: Produce) => p.id === parseInt(selectedProduce));
    
    if (produceIndex !== -1) {
      const newTransaction = {
        timestamp: Date.now(),
        from: user?.principal || '',
        to: selectedRecipient,
        details: details
      };

      allProduces[produceIndex] = {
        ...allProduces[produceIndex],
        currentOwner: selectedRecipient,
        price: priceNum,
        history: [...allProduces[produceIndex].history, newTransaction]
      };

      localStorage.setItem('agriTrace_produces', JSON.stringify(allProduces));
      
      toast({
        title: "Transfer Successful!",
        description: `Produce transferred to ${targetRole} successfully`,
      });
      
      onTransfer();
    }
  };

  const selectedProduceData = produces.find(p => p.id === parseInt(selectedProduce));

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
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Transfer to {targetRole}
          </h2>
          <p className="text-muted-foreground">
            Transfer produce ownership in the supply chain
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-warning to-accent rounded-lg">
                <Send className="h-5 w-5 text-white" />
              </div>
              Transfer Details
            </CardTitle>
            <CardDescription>
              Select produce and recipient for transfer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="produce">Select Produce</Label>
                <Select value={selectedProduce} onValueChange={setSelectedProduce}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose produce to transfer" />
                  </SelectTrigger>
                  <SelectContent>
                    {produces.map((produce) => (
                      <SelectItem key={produce.id} value={produce.id.toString()}>
                        {produce.produceType} - {produce.quality} (₹{produce.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProduceData && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Selected Produce Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedProduceData.produceType}</span>
                      <span className="text-muted-foreground">Quality:</span>
                      <span>{selectedProduceData.quality}</span>
                      <span className="text-muted-foreground">Current Price:</span>
                      <span>₹{selectedProduceData.price}</span>
                      <span className="text-muted-foreground">Origin:</span>
                      <span>{selectedProduceData.origin}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <Label htmlFor="recipient">Select {targetRole}</Label>
                <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Choose ${targetRole} to transfer to`} />
                  </SelectTrigger>
                  <SelectContent>
                    {recipients.map((recipient) => (
                      <SelectItem key={recipient.principal} value={recipient.principal}>
                        {recipient.name} - {recipient.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPrice">New Price (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter new price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Transfer Details</Label>
                <Textarea
                  id="details"
                  placeholder="Enter transfer details or notes..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <GradientButton
                  type="submit"
                  variant="warning"
                  size="lg"
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Transfer Produce
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