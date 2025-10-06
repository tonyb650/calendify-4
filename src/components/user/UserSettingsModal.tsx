import useCurrentUser from "@/hooks/useCurrentUser";
import { SetStateAction } from "react";
import Modal from "../Modal";
import UserAvatar from "./UserAvatar";
import UserSettingsForm from "./UserSettingsForm";
import GuestModeWarning from "@/app/(protected)/_components/GuestModeWarning";

type UserSettingsModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

const UserSettingsModal = ({
  isOpen,
  setIsOpen,
}: UserSettingsModalProps) => {
  const user = useCurrentUser();

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <UserAvatar user={user} />
          <span className="text-2xl">User Settings</span>
        </div>
      }
      description={
        <span className="text-slate-700">
          {user?.isGuest ?
            <GuestModeWarning/>
          :
            <>
              <span className="font-bold">{user?.name} ({user?.earliest} {user?.latest})</span><br />
              <span className="">{user?.email}</span><br />
            </>
          }
        </span>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <UserSettingsForm onClose={() => setIsOpen(false)} />
    </Modal>
  );
};

export default UserSettingsModal;

// return (
//   <Dialog open={isOpen} onOpenChange={setIsOpen}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle className='flex items-center gap-2'>
//           <UserAvatar user={user}/>
//           <span className='text-2xl'>User Settings</span>
//         </DialogTitle>
//         <DialogDescription className='text-slate-700'>
//           <span className='font-bold'>{user?.name} ({user?.earliest} {user?.latest})</span><br/>
//           <span className=''>{user?.email}</span><br/>
//         </DialogDescription>
//       </DialogHeader>
//               <UserSettingsForm onClose={() => setIsOpen(false)} />
//     </DialogContent>
//   </Dialog>
// )
