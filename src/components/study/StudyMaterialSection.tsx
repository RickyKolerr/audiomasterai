
import StudyMaterialUpload from "./StudyMaterialUpload";
import StudyMaterialList from "./StudyMaterialList";
import StudyDashboard from "./StudyDashboard";

const StudyMaterialSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      <StudyDashboard />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Study Materials</h2>
          <p className="text-gray-400">Convert your study materials to audio</p>
        </div>
        <StudyMaterialUpload />
      </div>
      <StudyMaterialList />
    </div>
  );
};

export default StudyMaterialSection;
