interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  // Reusable card component
  const Card = ({ children, className = "" }: CardProps) => {
    return (
      <div className={`bg-[#111] border border-gray-300 shadow-sm rounded-lg p-4 bg-[#faece5] max-w-4xl ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;