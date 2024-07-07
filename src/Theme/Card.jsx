

const Card = (props) => {
    const {imgSrc,text,onClick,isSelected}=props;
    return (
      <div 
        className={`relative w-[203.28px] h-[120px] rounded-[12px] border-[0.6px] border-[#464646] bg-gradient-to-r from-[#464646] via-[#FFFFFF] to-[#464646] flex items-center justify-center cursor-pointer ${isSelected ? 'opacity-100' : 'opacity-50'}`}
        onClick={onClick}
      >
        <video src={imgSrc} alt="Card image" className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]" />
        <div className="relative z-10 w-[86px] h-[32px] font-montserrat font-semibold text-2xl leading-[32px] text-center text-white">
          {text}
        </div>
      </div>
    );
  };

  export default Card;
  