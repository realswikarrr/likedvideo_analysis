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

const AnalysisDetail = ({ data1, newData }: any) => {
  const data = data1;
  const dataTwo = newData;

  let fakeLabel: any = [];
  let fakeData: any = [];

  let fakeLabel2: any = [];
  let fakeData2: any = [];

  for (const key in data) {
    fakeLabel.push(key);
    fakeData.push(data[key]);
  }

  for (const key in dataTwo) {
    fakeLabel2.push(key);
    fakeData2.push(dataTwo[key]);
  }

  const dataMake = {
    labels: fakeLabel,
    datasets: [
      {
        label: "No of Liked Videos",
        data: fakeData,
        borderColor: "black",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataMake2 = {
    labels: fakeLabel2,
    datasets: [
      {
        label: "No of Liked Videos",
        data: fakeData2,
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
        <Bar data={dataMake} className=" w-[1300px] h-96" />
      </div>
      <div>
        <h1 className="text-white mb-10">
          Most Watched Category According To Likes
        </h1>
        <Bar data={dataMake2} className=" w-[1300px] h-96" />
      </div>
    </div>
  );
};

export default AnalysisDetail;
