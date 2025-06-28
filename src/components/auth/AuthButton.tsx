
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Settings } from 'lucide-react';
import LoginModal from './LoginModal';

const AuthButton = () => {
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!user) {
    return (
      <>
        <Button 
          onClick={() => setShowLoginModal(true)}
          className="gradient-orange text-white font-comic font-bold rounded-full"
        >
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback className="gradient-orange text-white font-comic">
              {user.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      

      <DropdownMenuContent
  className="w-56 bg-white text-gray-900 border border-gray-200 rounded-xl shadow-md transition-all duration-300"
  align="end"
  forceMount
>
  <div className="flex items-center justify-start gap-2 p-3">
    <div className="flex flex-col space-y-1 leading-none">
      <p className="font-comic font-medium text-sm text-gray-800">{user.displayName}</p>
      <p className="font-comic text-xs text-gray-500">{user.email}</p>
    </div>
  </div>

  <DropdownMenuItem
    className="font-comic px-3 py-2 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-blue-200 hover:to-violet-500 hover:text-white transition-all duration-300 cursor-pointer rounded-xl"
    >
    <Settings className="mr-2 h-4 w-4" />
    <span>Settings</span>
  </DropdownMenuItem>

  <DropdownMenuItem
    onClick={logout}
    className="font-comic px-3 py-2 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-rose-200 hover:to-red-400 hover:text-white transition-all duration-300 cursor-pointer rounded-xl"
  >
    <LogOut className="mr-2 h-4 w-4" />
    <span>Log out</span>
  </DropdownMenuItem>
</DropdownMenuContent>


    </DropdownMenu>
  );
};

export default AuthButton;
