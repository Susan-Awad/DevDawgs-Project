import Image from 'next/image';
import Welcome from './Welcome';

interface ContentProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Content = ({ children, className = "" }: ContentProps) => {
    return (
        <div className='bg-[#F7D0BC]'>
        {children}
      </div>
    );
  };

export default Content;
