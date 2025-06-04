
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login, loading } = useAuth();
  const [loginLoading, setLoginLoading] = useState<'google' | 'firebase' | null>(null);

  const handleLogin = async (provider: 'google' | 'firebase') => {
    setLoginLoading(provider);
    try {
      await login(provider);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoginLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-fredoka text-2xl text-center">
            Welcome to KidLearn! 🎓
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="font-comic text-gray-600 text-center">
            Sign in to save your progress and unlock amazing features!
          </p>
          
          <div className="space-y-3">
            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-comic font-bold rounded-full"
              onClick={() => handleLogin('google')}
              disabled={loading || loginLoading !== null}
            >
              {loginLoading === 'google' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <span className="mr-2">🔍</span>
              )}
              Continue with Google
            </Button>
            
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-comic font-bold rounded-full"
              onClick={() => handleLogin('firebase')}
              disabled={loading || loginLoading !== null}
            >
              {loginLoading === 'firebase' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <span className="mr-2">🔥</span>
              )}
              Continue with Firebase
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
