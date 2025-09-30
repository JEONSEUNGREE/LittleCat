import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Volume2, 
  Vibrate,
  Clock,
  Target,
  Sliders,
  Save,
  RefreshCw,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clsx } from 'clsx';

const Settings: React.FC = () => {
  const { 
    userSettings, 
    updateUserSettings, 
    calibrationData,
    updateCalibration 
  } = useApp();
  
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(1);
    
    // Simulate calibration process
    setTimeout(() => {
      setCalibrationStep(2);
      setTimeout(() => {
        setCalibrationStep(3);
        setTimeout(() => {
          const newCalibration = {
            baseline: {
              neckAngle: Math.random() * 5 - 2.5,
              shoulderLevel: Math.random() * 3 - 1.5,
              backCurvature: Math.random() * 5 - 2.5,
              headPosition: Math.random() * 3 - 1.5,
            },
            isCalibrated: true,
            calibratedAt: new Date(),
          };
          updateCalibration(newCalibration);
          setIsCalibrating(false);
          setCalibrationStep(0);
        }, 2000);
      }, 2000);
    }, 2000);
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Calibration Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Sliders className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold">Posture Calibration</h2>
          </div>
          {calibrationData.isCalibrated && (
            <span className="px-3 py-1 bg-success-100 text-success-700 text-sm rounded-full">
              Calibrated
            </span>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 mb-3">
            Calibration helps the app understand your natural sitting position and provides more accurate posture scoring.
          </p>
          {calibrationData.isCalibrated && calibrationData.calibratedAt && (
            <p className="text-xs text-gray-600">
              Last calibrated: {new Date(calibrationData.calibratedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {isCalibrating ? (
          <div className="text-center py-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="w-10 h-10 text-primary-600" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Calibrating...</h3>
            <p className="text-sm text-gray-600 mb-4">
              {calibrationStep === 1 && 'Analyzing your current position...'}
              {calibrationStep === 2 && 'Measuring baseline metrics...'}
              {calibrationStep === 3 && 'Finalizing calibration...'}
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className={clsx(
                    'w-2 h-2 rounded-full',
                    calibrationStep >= step ? 'bg-primary-600' : 'bg-gray-300'
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: calibrationStep >= step ? 1 : 0.5 }}
                />
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={handleCalibration}
            className="btn-primary w-full"
          >
            {calibrationData.isCalibrated ? 'Recalibrate' : 'Start Calibration'}
          </button>
        )}
      </div>

      {/* Alert Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold">Alert Preferences</h2>
        </div>

        <div className="space-y-4">
          <ToggleSetting
            label="Enable Alerts"
            description="Receive notifications about your posture"
            enabled={userSettings.alertsEnabled}
            onChange={(enabled) => updateUserSettings({ alertsEnabled: enabled })}
            icon={<Bell className="w-5 h-5" />}
          />

          <div className={clsx('space-y-4', !userSettings.alertsEnabled && 'opacity-50 pointer-events-none')}>
            <RangeSetting
              label="Alert Frequency"
              value={userSettings.alertFrequency}
              min={5}
              max={60}
              step={5}
              unit="minutes"
              onChange={(value) => updateUserSettings({ alertFrequency: value })}
            />

            <ToggleSetting
              label="Sound Alerts"
              description="Play sound when posture needs correction"
              enabled={userSettings.soundEnabled}
              onChange={(enabled) => updateUserSettings({ soundEnabled: enabled })}
              icon={<Volume2 className="w-5 h-5" />}
            />

            <ToggleSetting
              label="Vibration Alerts"
              description="Vibrate device for notifications"
              enabled={userSettings.vibrationEnabled}
              onChange={(enabled) => updateUserSettings({ vibrationEnabled: enabled })}
              icon={<Vibrate className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>

      {/* Break Reminders */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold">Break Reminders</h2>
        </div>

        <div className="space-y-4">
          <ToggleSetting
            label="Enable Break Reminders"
            description="Get reminded to take regular breaks"
            enabled={userSettings.breakReminders}
            onChange={(enabled) => updateUserSettings({ breakReminders: enabled })}
            icon={<Clock className="w-5 h-5" />}
          />

          <div className={clsx('space-y-4', !userSettings.breakReminders && 'opacity-50 pointer-events-none')}>
            <RangeSetting
              label="Break Interval"
              value={userSettings.breakInterval}
              min={15}
              max={120}
              step={15}
              unit="minutes"
              onChange={(value) => updateUserSettings({ breakInterval: value })}
            />
          </div>
        </div>
      </div>

      {/* Goals & Targets */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold">Goals & Targets</h2>
        </div>

        <div className="space-y-4">
          <RangeSetting
            label="Target Posture Score"
            value={userSettings.targetScore}
            min={60}
            max={100}
            step={5}
            unit="points"
            onChange={(value) => updateUserSettings({ targetScore: value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sensitivity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => updateUserSettings({ sensitivity: level })}
                  className={clsx(
                    'py-2 px-4 rounded-lg font-medium capitalize transition-colors',
                    userSettings.sensitivity === level
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Work Hours */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold">Work Hours</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={userSettings.workHours.start}
              onChange={(e) => updateUserSettings({
                workHours: { ...userSettings.workHours, start: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={userSettings.workHours.end}
              onChange={(e) => updateUserSettings({
                workHours: { ...userSettings.workHours, end: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleSaveSettings}
        className={clsx(
          'w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2',
          saveSuccess
            ? 'bg-success-600 text-white'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        )}
        whileTap={{ scale: 0.98 }}
      >
        {saveSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>Settings Saved!</span>
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

interface ToggleSettingProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon: React.ReactNode;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, description, enabled, onChange, icon }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start space-x-3">
        <div className="pt-0.5 text-gray-600">{icon}</div>
        <div>
          <div className="text-sm font-medium text-gray-900">{label}</div>
          <div className="text-xs text-gray-600">{description}</div>
        </div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          enabled ? 'bg-primary-600' : 'bg-gray-300'
        )}
      >
        <span
          className={clsx(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
};

interface RangeSettingProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

const RangeSetting: React.FC<RangeSettingProps> = ({ label, value, min, max, step, unit, onChange }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-primary-600">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Settings;