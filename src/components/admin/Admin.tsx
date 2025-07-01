import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Settings, BarChart3, Shield, GraduationCap, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Header from '@/components/home/Header';
import AdminStoriesManager from '@/components/admin/AdminStoriesManager';
import AdminTestManager from '@/components/admin/AdminTestManager';
import AdminUserManager from '@/components/admin/AdminUserManager';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminCourseManager from '@/components/admin/AdminCourseManager';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🔧 Admin Dashboard
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Manage content, users, and platform settings with comprehensive administrative tools
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full bg-white rounded-2xl p-2 shadow-lg mb-8">
            <TabsTrigger value="overview" className="rounded-xl font-comic font-bold text-xs data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600">
              📊 Overview
            </TabsTrigger>
            <TabsTrigger value="stories" className="rounded-xl font-comic font-bold text-xs data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600">
              📚 Stories
            </TabsTrigger>
            <TabsTrigger value="courses" className="rounded-xl font-comic font-bold text-xs data-[state=active]:bg-green-100 data-[state=active]:text-green-600">
              🎓 Courses
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-xl font-comic font-bold text-xs data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600">
              👥 Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl font-comic font-bold text-xs data-[state=active]:bg-pink-100 data-[state=active]:text-pink-600">
              📈 Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl font-comic font-bold text-xs data-[state=active]:bg-gray-100 data-[state=active]:text-gray-600">
              ⚙️ Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-comic text-blue-700 text-sm">Total Users</p>
                    <p className="font-fredoka text-3xl font-bold text-blue-800">1,234</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-comic text-purple-700 text-sm">Stories Published</p>
                    <p className="font-fredoka text-3xl font-bold text-purple-800">48</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-green-100 to-green-200 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-comic text-green-700 text-sm">Active Courses</p>
                    <p className="font-fredoka text-3xl font-bold text-green-800">12</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-orange-100 to-orange-200 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-comic text-orange-700 text-sm">Monthly Sessions</p>
                    <p className="font-fredoka text-3xl font-bold text-orange-800">15.6K</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
              </Card>
            </div>

            <Card className="p-8 bg-white rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">
                Welcome to Admin Dashboard!
              </h3>
              <p className="font-comic text-gray-600 max-w-2xl mx-auto">
                Manage your educational platform with powerful tools to create engaging content, 
                monitor user progress, and maintain a safe learning environment for children.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="stories">
            <AdminStoriesManager />
          </TabsContent>

          <TabsContent value="courses">
            <AdminCourseManager />
          </TabsContent>

          <TabsContent value="users">
            <AdminUserManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;