
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 space-y-4 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-gray-500">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Try again
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
