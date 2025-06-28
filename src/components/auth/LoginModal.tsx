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
      <DialogContent className="sm:max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl px-6 py-6 ">
        <DialogHeader>
          <DialogTitle className="font-fredoka text-3xl text-center text-purple-700 mb-2">
            🎓 Welcome to KidLearn!
          </DialogTitle>
        </DialogHeader>

        <p className="font-comic text-sm text-gray-600 text-center mb-4">
          Sign in to save your progress and unlock amazing adventures!
        </p>

        <div className="space-y-3">
          <Button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-comic font-bold rounded-full transition-all duration-300"
            onClick={() => handleLogin('google')}
            disabled={loading || loginLoading !== null}
          >
            {loginLoading === 'google' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="text-lg">🔍</span>
            )}
            Continue with Google
          </Button>

          <Button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-comic font-bold rounded-full transition-all duration-300"
            onClick={() => handleLogin('firebase')}
            disabled={loading || loginLoading !== null}
          >
            {loginLoading === 'firebase' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="text-lg">🔥</span>
            )}
            Continue with Firebase
          </Button>
        </div>

        <div className="text-center mt-4 text-xs text-gray-400 font-comic">
          We never share your login details. 💖
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
