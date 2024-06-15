import { backgroundList } from "../utils/data";
import { useState } from "react";
import Card from "./Card";

const Background = (props) => {
  const { option, setOption } = props;
  const [selected, setSelected] = useState(null);

  const handleCardClick = (index) => {
    setOption(backgroundList[index].url);
    setSelected(index);
  };

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 w-[227.28px] h-[500px] rounded-lg p-3 gap-2 bg-gray-900 bg-opacity-50 flex flex-col shadow-lg">
      {backgroundList.map((background, index) => (
        <Card
          key={index}
          imgSrc={background.url}
          text={background.name}
          onClick={() => handleCardClick(index)}
          isSelected={selected === index}
        />
      ))}
    </div>
  );
};

export default Background;
