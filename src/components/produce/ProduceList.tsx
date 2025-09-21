import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Send, Eye, Package, MapPin, Calendar, User } from 'lucide-react';
import { Produce } from '@/types/produce';

interface ProduceListProps {
  produces: Produce[];
  showTransferButton?: boolean;
}

export const ProduceList: React.FC<ProduceListProps> = ({ produces, showTransferButton = false }) => {
  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'premium':
        return 'bg-gradient-to-r from-success to-accent text-white';
      case 'grade a':
        return 'bg-gradient-to-r from-primary to-accent text-white';
      case 'grade b':
        return 'bg-gradient-to-r from-warning to-accent text-white';
      default:
        return 'bg-muted';
    }
  };

  if (produces.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Produce Found</h3>
          <p className="text-muted-foreground">
            {showTransferButton 
              ? "You haven't registered any produce yet." 
              : "No produce has been transferred to you yet."
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {produces.map((produce) => (
        <Card key={produce.id} className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg capitalize">{produce.produceType}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {produce.origin}
                </CardDescription>
              </div>
              <Badge className={`${getQualityColor(produce.quality)} border-0`}>
                {produce.quality}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Farmer:</span>
              </div>
              <span className="font-medium">{produce.farmer}</span>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Registered:</span>
              </div>
              <span className="font-medium">
                {new Date(produce.registeredTime).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <p className="text-2xl font-bold text-success">₹{produce.price}</p>
                <p className="text-xs text-muted-foreground">per unit</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 hover:border-primary/20"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {showTransferButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-warning/10 hover:border-warning/20"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Supply Chain History */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Supply Chain History</h4>
              <div className="space-y-1">
                {produce.history.slice(-3).map((transaction, index) => (
                  <div key={index} className="text-xs p-2 bg-muted/50 rounded">
                    <p className="font-medium">{transaction.details}</p>
                    <p className="text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};