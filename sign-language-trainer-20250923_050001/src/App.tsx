
import Header from './components/Header';
import LessonCard from './components/LessonCard';
import LearningView from './components/LearningView';
import { useAppStore } from './store/useAppStore';
import { Sparkles, Target, Users } from 'lucide-react';

function App() {
  const { lessons, currentLesson, setCurrentLesson } = useAppStore();

  const handleHomeClick = () => {
    setCurrentLesson(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Header onHomeClick={handleHomeClick} />

        {!currentLesson ? (
          <>
            <div className="mb-8 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                수화 학습 시작하기
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </h2>
              <p className="text-lg opacity-90">
                쉽고 재미있게 수화를 배워보세요!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  category={lesson.category}
                  difficulty={lesson.difficulty}
                  progress={lesson.progress}
                  completed={lesson.completed}
                  isLocked={index > 0 && !lessons[index - 1].completed}
                  onClick={() => setCurrentLesson(lesson)}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-white/90 rounded-xl p-6 text-center card-shadow">
                <Target className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">단계별 학습</h3>
                <p className="text-sm text-gray-600">
                  초급부터 고급까지 체계적으로 배워요
                </p>
              </div>

              <div className="bg-white/90 rounded-xl p-6 text-center card-shadow">
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">인터랙티브 학습</h3>
                <p className="text-sm text-gray-600">
                  시각적 자료로 쉽게 이해해요
                </p>
              </div>

              <div className="bg-white/90 rounded-xl p-6 text-center card-shadow">
                <Users className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">소통의 시작</h3>
                <p className="text-sm text-gray-600">
                  수화로 더 많은 사람과 소통해요
                </p>
              </div>
            </div>
          </>
        ) : (
          <LearningView />
        )}
      </div>
    </div>
  );
}

export default App;