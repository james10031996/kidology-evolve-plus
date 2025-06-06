
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Users, BookOpen, Star, Calendar, Download } from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const analyticsData = {
    totalUsers: 1234,
    activeUsers: 890,
    coursesCompleted: 456,
    totalStarsEarned: 12500,
    userGrowth: 15.3,
    engagementRate: 78.5,
    completionRate: 65.2,
    avgSessionTime: 25
  };

  const chartData = [
    { name: 'Mon', users: 120, courses: 45, stars: 890 },
    { name: 'Tue', users: 145, courses: 52, stars: 950 },
    { name: 'Wed', users: 135, courses: 48, stars: 920 },
    { name: 'Thu', users: 158, courses: 61, stars: 1020 },
    { name: 'Fri', users: 142, courses: 55, stars: 980 },
    { name: 'Sat', users: 178, courses: 68, stars: 1150 },
    { name: 'Sun', users: 165, courses: 62, stars: 1080 }
  ];

  const topCourses = [
    { name: 'Math Basics', completions: 234, rating: 4.8 },
    { name: 'Reading Adventure', completions: 198, rating: 4.9 },
    { name: 'Science Explorers', completions: 176, rating: 4.7 },
    { name: 'Art & Creativity', completions: 145, rating: 4.6 },
    { name: 'Language Lab', completions: 123, rating: 4.5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fredoka font-bold gradient-pink bg-clip-text text-transparent mb-2">
            📈 Analytics Dashboard
          </h2>
          <p className="text-gray-600 font-comic">
            Track platform performance and user engagement
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 font-comic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="gradient-pink text-white hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-comic text-blue-700 text-sm">Total Users</p>
              <p className="font-fredoka text-3xl font-bold text-blue-800">{analyticsData.totalUsers.toLocaleString()}</p>
              <p className="font-comic text-xs text-blue-600">+{analyticsData.userGrowth}% this week</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-100 to-green-200 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-comic text-green-700 text-sm">Active Users</p>
              <p className="font-fredoka text-3xl font-bold text-green-800">{analyticsData.activeUsers.toLocaleString()}</p>
              <p className="font-comic text-xs text-green-600">Engagement: {analyticsData.engagementRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-comic text-purple-700 text-sm">Courses Completed</p>
              <p className="font-fredoka text-3xl font-bold text-purple-800">{analyticsData.coursesCompleted}</p>
              <p className="font-comic text-xs text-purple-600">Rate: {analyticsData.completionRate}%</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-comic text-yellow-700 text-sm">Stars Earned</p>
              <p className="font-fredoka text-3xl font-bold text-yellow-800">{analyticsData.totalStarsEarned.toLocaleString()}</p>
              <p className="font-comic text-xs text-yellow-600">Avg: {analyticsData.avgSessionTime} min/session</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
            📊 Activity Overview
          </h3>
          <div className="space-y-4">
            {chartData.map((day, index) => (
              <div key={day.name} className="flex items-center justify-between">
                <div className="font-comic font-bold text-gray-700">{day.name}</div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="font-comic">{day.users} users</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-comic">{day.courses} courses</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="font-comic">{day.stars} stars</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
            🏆 Top Performing Courses
          </h3>
          <div className="space-y-3">
            {topCourses.map((course, index) => (
              <div key={course.name} className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <div>
                  <div className="font-comic font-bold text-gray-800">{course.name}</div>
                  <div className="text-sm text-gray-600 font-comic">{course.completions} completions</div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-comic font-bold">{course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card className="p-6">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
          📋 Detailed Metrics
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-fredoka font-bold text-blue-600 mb-2">
              {Math.round(analyticsData.avgSessionTime)}m
            </div>
            <div className="font-comic text-gray-600">Average Session Time</div>
            <div className="text-sm text-green-600 font-comic">+2m from last week</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-fredoka font-bold text-purple-600 mb-2">
              {analyticsData.completionRate}%
            </div>
            <div className="font-comic text-gray-600">Course Completion Rate</div>
            <div className="text-sm text-green-600 font-comic">+5% from last month</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-fredoka font-bold text-orange-600 mb-2">
              {analyticsData.engagementRate}%
            </div>
            <div className="font-comic text-gray-600">User Engagement Rate</div>
            <div className="text-sm text-green-600 font-comic">+3% from last week</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
