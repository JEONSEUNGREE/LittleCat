import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, TrendingUp, Pause, Play, User, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clsx } from 'clsx';

const PostureMonitor: React.FC = () => {
  const { 
    currentPosture, 
    isMonitoring, 
    startMonitoring, 
    stopMonitoring,
    currentSession,
    calibrationData,
    userSettings 
  } = useApp();
  
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (currentPosture) {
      // Animate score changes
      const timer = setTimeout(() => {
        setAnimatedScore(currentPosture.score);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPosture]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-success-400 to-success-600';
    if (score >= 60) return 'from-warning-400 to-warning-600';
    return 'from-danger-400 to-danger-600';
  };

  const getPostureStatus = (score: number) => {
    if (score >= 80) return 'Excellent Posture';
    if (score >= 60) return 'Good Posture';
    if (score >= 40) return 'Needs Improvement';
    return 'Poor Posture';
  };

  const getPostureAdvice = (score: number) => {
    if (score >= 80) return 'Keep up the great work! Your posture is excellent.';
    if (score >= 60) return 'You\'re doing well. Minor adjustments could help.';
    if (score >= 40) return 'Try to sit up straighter and align your shoulders.';
    return 'Please adjust your position. Check your neck and back alignment.';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Main Monitoring Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold">Posture Monitor</h2>
          </div>
          <button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            className={clsx(
              'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors',
              isMonitoring 
                ? 'bg-danger-100 text-danger-700 hover:bg-danger-200'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            )}
          >
            {isMonitoring ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Stop Monitoring</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Monitoring</span>
              </>
            )}
          </button>
        </div>

        {!calibrationData.isCalibrated && (
          <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning-900">Calibration Required</p>
                <p className="text-sm text-warning-700 mt-1">
                  Please complete the calibration process in Settings for accurate monitoring.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Score Display */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            {/* Circular Progress Background */}
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className={clsx('transition-colors duration-500', getScoreColor(animatedScore))}
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 88 * (1 - (animatedScore / 100))
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>
            
            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className={clsx('text-5xl font-bold', getScoreColor(animatedScore))}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                key={animatedScore}
              >
                {animatedScore}
              </motion.div>
              <div className="text-sm text-gray-600 mt-1">Score</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={getPostureStatus(animatedScore)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 text-center"
            >
              <h3 className={clsx('text-xl font-semibold', getScoreColor(animatedScore))}>
                {getPostureStatus(animatedScore)}
              </h3>
              <p className="text-gray-600 text-sm mt-2 max-w-xs">
                {getPostureAdvice(animatedScore)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Session Stats */}
        {currentSession && (
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {formatDuration(currentSession.duration)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Session Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">
                {Math.round(currentSession.averageScore)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Score</div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Metrics */}
      {currentPosture && isMonitoring && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary-600" />
            <span>Posture Metrics</span>
          </h3>
          
          <div className="space-y-4">
            <MetricBar
              label="Neck Angle"
              value={Math.abs(currentPosture.neckAngle)}
              maxValue={45}
              optimal={15}
              unit="°"
            />
            <MetricBar
              label="Shoulder Level"
              value={Math.abs(currentPosture.shoulderLevel)}
              maxValue={20}
              optimal={5}
              unit="°"
            />
            <MetricBar
              label="Back Curvature"
              value={Math.abs(currentPosture.backCurvature)}
              maxValue={30}
              optimal={10}
              unit="°"
            />
            <MetricBar
              label="Head Position"
              value={Math.abs(currentPosture.headPosition)}
              maxValue={20}
              optimal={5}
              unit="cm"
            />
          </div>
        </div>
      )}

      {/* Visual Posture Guide */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <User className="w-5 h-5 text-primary-600" />
          <span>Ideal Posture Guide</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PostureGuideItem
            title="Head & Neck"
            tips={[
              'Keep head level and balanced',
              'Chin slightly tucked',
              'Ears aligned with shoulders'
            ]}
            icon="🧠"
          />
          <PostureGuideItem
            title="Shoulders & Arms"
            tips={[
              'Shoulders relaxed and back',
              'Arms at 90° angle',
              'Wrists straight and neutral'
            ]}
            icon="💪"
          />
          <PostureGuideItem
            title="Back & Hips"
            tips={[
              'Back straight with natural curve',
              'Feet flat on floor',
              'Hips at 90-100° angle'
            ]}
            icon="🦴"
          />
        </div>
      </div>
    </div>
  );
};

interface MetricBarProps {
  label: string;
  value: number;
  maxValue: number;
  optimal: number;
  unit: string;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, value, maxValue, optimal, unit }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const isOptimal = value <= optimal;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">{label}</span>
        <span className={clsx('font-medium', isOptimal ? 'text-success-600' : 'text-warning-600')}>
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={clsx(
            'absolute left-0 top-0 h-full rounded-full',
            isOptimal ? 'bg-success-500' : 'bg-warning-500'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div 
          className="absolute top-0 h-full w-0.5 bg-gray-400"
          style={{ left: `${(optimal / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );
};

interface PostureGuideItemProps {
  title: string;
  tips: string[];
  icon: string;
}

const PostureGuideItem: React.FC<PostureGuideItemProps> = ({ title, tips, icon }) => {
  return (
    <div className="text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary-500 mr-1">•</span>
            <span className="text-left">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostureMonitor;