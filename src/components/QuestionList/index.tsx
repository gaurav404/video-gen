import { Doubt } from "@/types";
import { useEffect, useState } from "react";
import { useDoubtContext } from "../Contexts/DoubtContext";


type Props = {
  handleDoubtSelect: () => void;
};
export const QuestionList = ({ handleDoubtSelect }: Props) => {
  const { setSelectedDoubt} = useDoubtContext()
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const handleSelection = (selectedDoubt: Doubt) => {
    setDoubts(
        doubts.map((doubt) => ({
            ...doubt,
            isActive: doubt.id === selectedDoubt.id,
        }))
    );
    handleDoubtSelect()
    setSelectedDoubt(selectedDoubt)
  }
  useEffect(() => {
    setDoubts([
      {
        id: 1,
        text: "How do I implement pagination in React with a REST API?",
        timestamp: "Just now",
        status: "pending",
        isActive: true,
      },
      {
        id: 2,
        text: "What's the difference between useEffect and useLayoutEffect in React?",
        timestamp: "2 hours ago",
        status: "generated",
        isActive: false,
      },
    ]);
  }, []);
  return (
    <div className="overflow-y-auto flex-grow">
      <ul className="py-2">
        {doubts.map((doubt) => (
          <li
            key={doubt.id}
            onClick={() => handleSelection(doubt)}
            className={`mx-2 px-4 py-3 mb-1 rounded-lg cursor-pointer transition-colors ${
              doubt.isActive ? "bg-blue-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <div className="line-clamp-2 text-sm mb-2">{doubt.text}</div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">{doubt.timestamp}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  doubt.status === "generated"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              ></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
