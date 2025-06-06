
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, RefreshCw, Shield, Mail, Globe, Palette } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Learning Adventure',
    siteDescription: 'Interactive Educational Platform for Children',
    allowRegistration: true,
    requireEmailVerification: true,
    enableNotifications: true,
    maxUsersPerAccount: 5,
    sessionTimeout: 60,
    defaultTheme: 'light',
    primaryColor: '#6366f1',
    maintenanceMode: false,
    backupFrequency: 'daily',
    emailProvider: 'smtp',
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    contentModeration: true,
    autoSave: true,
    analyticsEnabled: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    // Here you would typically save to backend
  };

  const handleResetSettings = () => {
    // Reset to default values
    setSettings({
      siteName: 'Learning Adventure',
      siteDescription: 'Interactive Educational Platform for Children',
      allowRegistration: true,
      requireEmailVerification: true,
      enableNotifications: true,
      maxUsersPerAccount: 5,
      sessionTimeout: 60,
      defaultTheme: 'light',
      primaryColor: '#6366f1',
      maintenanceMode: false,
      backupFrequency: 'daily',
      emailProvider: 'smtp',
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
      contentModeration: true,
      autoSave: true,
      analyticsEnabled: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fredoka font-bold gradient-gray bg-clip-text text-transparent mb-2">
            ⚙️ Platform Settings
          </h2>
          <p className="text-gray-600 font-comic">
            Configure platform behavior and preferences
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleResetSettings} variant="outline" className="font-comic">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings} className="gradient-gray text-white hover:opacity-90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="p-6 border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-gray-600" />
            <h3 className="font-fredoka font-bold text-xl text-gray-800">
              General Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteName" className="font-comic font-bold">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="font-comic"
              />
            </div>
            
            <div>
              <Label htmlFor="siteDescription" className="font-comic font-bold">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                className="font-comic"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="allowRegistration" className="font-comic font-bold">Allow New Registrations</Label>
              <Switch
                id="allowRegistration"
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="requireEmailVerification" className="font-comic font-bold">Require Email Verification</Label>
              <Switch
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode" className="font-comic font-bold">Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="font-fredoka font-bold text-xl text-gray-800">
              Security Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="maxUsersPerAccount" className="font-comic font-bold">Max Users Per Account</Label>
              <Input
                id="maxUsersPerAccount"
                type="number"
                value={settings.maxUsersPerAccount}
                onChange={(e) => handleSettingChange('maxUsersPerAccount', parseInt(e.target.value))}
                className="font-comic"
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout" className="font-comic font-bold">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="font-comic"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="contentModeration" className="font-comic font-bold">Content Moderation</Label>
              <Switch
                id="contentModeration"
                checked={settings.contentModeration}
                onCheckedChange={(checked) => handleSettingChange('contentModeration', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="backupFrequency" className="font-comic font-bold">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                <SelectTrigger className="font-comic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-6 border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5 text-gray-600" />
            <h3 className="font-fredoka font-bold text-xl text-gray-800">
              Appearance Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="defaultTheme" className="font-comic font-bold">Default Theme</Label>
              <Select value={settings.defaultTheme} onValueChange={(value) => handleSettingChange('defaultTheme', value)}>
                <SelectTrigger className="font-comic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="primaryColor" className="font-comic font-bold">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="font-comic"
                  placeholder="#6366f1"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoSave" className="font-comic font-bold">Auto-save Changes</Label>
              <Switch
                id="autoSave"
                checked={settings.autoSave}
                onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Email Settings */}
        <Card className="p-6 border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-gray-600" />
            <h3 className="font-fredoka font-bold text-xl text-gray-800">
              Email Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="emailProvider" className="font-comic font-bold">Email Provider</Label>
              <Select value={settings.emailProvider} onValueChange={(value) => handleSettingChange('emailProvider', value)}>
                <SelectTrigger className="font-comic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="ses">Amazon SES</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="smtpHost" className="font-comic font-bold">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={settings.smtpHost}
                onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                className="font-comic"
              />
            </div>
            
            <div>
              <Label htmlFor="smtpPort" className="font-comic font-bold">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                value={settings.smtpPort}
                onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
                className="font-comic"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="enableNotifications" className="font-comic font-bold">Enable Email Notifications</Label>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="analyticsEnabled" className="font-comic font-bold">Enable Analytics</Label>
              <Switch
                id="analyticsEnabled"
                checked={settings.analyticsEnabled}
                onCheckedChange={(checked) => handleSettingChange('analyticsEnabled', checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="p-6 border-gray-200">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
          🔧 System Status
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="font-fredoka font-bold text-gray-800">Server Status</div>
            <div className="font-comic text-green-600">Online</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="font-fredoka font-bold text-gray-800">Database</div>
            <div className="font-comic text-blue-600">Connected</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div className="font-fredoka font-bold text-gray-800">Storage</div>
            <div className="font-comic text-purple-600">75% Used</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings;
