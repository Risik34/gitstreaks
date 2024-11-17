import { Home, LucideIcon, Plus, UserIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import AddHabitForm from '@/components/AddHabit';

const Navbar = () => {
  return (
    <div className="flex flex-row py-3 gap-8 w-full fixed bottom-0 justify-center ">
      <Link to="/">
        <IconBlock Icon={Home} />
      </Link>

      <Dialog>
        <DialogTrigger>
          <IconBlock
            Icon={Plus}
            className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-200"
          />
        </DialogTrigger>
        <DialogContent className="bg-gray-900 w-3/4 rounded-md text-white">
          <AddHabitForm />
        </DialogContent>
      </Dialog>
      <IconBlock Icon={UserIcon} />
    </div>
  );
};

interface IconBlockProps {
  Icon: LucideIcon;
  className?: string;
}
const IconBlock: React.FC<IconBlockProps> = ({ Icon, className }) => {
  return (
    <div
      className={twMerge(
        'rounded-md p-2 text-cyan-50 hover:bg-gray-900',
        className,
      )}
    >
      <Icon className="size-8" />
    </div>
  );
};

export default Navbar;
