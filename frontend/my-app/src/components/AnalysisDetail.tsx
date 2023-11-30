import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  channelAnalysisData?: any;
  categoryAnalysisData?: any;
}

const AnalysisDetail = ({
  channelAnalysisData = {},
  categoryAnalysisData = {},
}: Props) => {
  // const data = data1; // channelAnalysisData
  // const dataTwo = newData; // categoryAnalysisData

  const channelDataLabels: any = [];
  const channelData: any = [];

  const categoryDataLabels: any = [];
  const categoryData: any = [];

  for (const key in channelAnalysisData) {
    channelDataLabels.push(key);
    channelData.push(channelAnalysisData[key]);
  }

  for (const key in categoryAnalysisData) {
    categoryDataLabels.push(key);
    categoryData.push(categoryAnalysisData[key]);
  }

  // channel Data
  const finalChannelData = {
    labels: channelDataLabels,
    datasets: [
      {
        label: "No of Liked Videos",
        data: channelData,
        borderColor: "black",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // category Data
  const finalCategoryData = {
    labels: categoryDataLabels,
    datasets: [
      {
        label: "No of Liked Videos",
        data: categoryData,
        borderColor: "black",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center text-center gap-36 mt-20">
      <div>
        <h1 className="text-white mb-10">
          Most Watched Channel According To Likes
        </h1>
        <Bar data={finalChannelData} className=" w-[1300px] h-96" />
      </div>
      <div>
        <h1 className="text-white mb-10">
          Most Watched Category According To Likes
        </h1>
        <Bar data={finalCategoryData} className=" w-[1300px] h-96" />
      </div>
    </div>
  );
};

export default AnalysisDetail;
