
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Calendar, Star, Ban, Edit, Trash2, Search, Filter } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  totalStars: number;
  coursesCompleted: number;
  lastActive: string;
}

const AdminUserManager = () => {
  const [users] = useState<UserData[]>([
    {
      id: '1',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      totalStars: 450,
      coursesCompleted: 3,
      lastActive: '2024-01-20'
    },
    {
      id: '2',
      name: 'Michael Smith',
      email: 'michael@example.com',
      role: 'parent',
      status: 'active',
      joinDate: '2024-01-10',
      totalStars: 0,
      coursesCompleted: 0,
      lastActive: '2024-01-19'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'teacher',
      status: 'active',
      joinDate: '2023-12-05',
      totalStars: 0,
      coursesCompleted: 0,
      lastActive: '2024-01-21'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'parent': return 'bg-green-100 text-green-700 border-green-200';
      case 'teacher': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'banned': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fredoka font-bold gradient-orange bg-clip-text text-transparent mb-2">
            👥 User Management
          </h2>
          <p className="text-gray-600 font-comic">
            Monitor and manage user accounts and activity
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-comic"
            />
          </div>
          
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-32 font-comic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="parent">Parents</SelectItem>
              <SelectItem value="teacher">Teachers</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32 font-comic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-6 border-orange-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 font-fredoka text-lg">
                    {user.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <span className="font-comic">{user.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={`text-xs font-comic ${getRoleColor(user.role)}`}>
                      {user.role}
                    </Badge>
                    <Badge className={`text-xs font-comic ${getStatusColor(user.status)}`}>
                      {user.status}
                    </Badge>
                  </div>
                  
                  {user.role === 'student' && (
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="font-comic font-bold">{user.totalStars}</span>
                      </div>
                      <div className="font-comic text-gray-600">
                        {user.coursesCompleted} courses
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs text-orange-600 border-orange-200">
                    <Ban className="w-3 h-3 mr-1" />
                    {user.status === 'banned' ? 'Unban' : 'Ban'}
                  </Button>
                  <Button size="sm" variant="destructive" className="text-xs">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-orange-100 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 font-comic">Joined:</span>
                <div className="font-bold text-gray-700">{user.joinDate}</div>
              </div>
              <div>
                <span className="text-gray-600 font-comic">Last Active:</span>
                <div className="font-bold text-gray-700">{user.lastActive}</div>
              </div>
              <div>
                <span className="text-gray-600 font-comic">Account ID:</span>
                <div className="font-bold text-gray-700 text-xs">{user.id}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="p-12 text-center border-orange-200">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-fredoka font-bold text-gray-700 mb-2">
            No Users Found
          </h3>
          <p className="text-gray-500 font-comic">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </div>
  );
};

export default AdminUserManager;
