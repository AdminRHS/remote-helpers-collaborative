
import AquaGame from "@/components/AquaGame";

const Underwater = () => {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .clip-path-triangle {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          }
        `}
      </style>
      <AquaGame vehicleType="sportsCar" />
    </>
  );
};

export default Underwater;
