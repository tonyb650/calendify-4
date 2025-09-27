import { ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";

type ModalProps = {
  title?: string | ReactNode;
  description?: string | ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

// TODO Can expand on this component to make it responsive (dialog for desktop, drawer for mobile)
// https://www.youtube.com/watch?v=JwNf4ujqsFU

export default function Modal({
  title,
  isOpen,
  setIsOpen,
  description,
  children
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}



//Old Headless:

// return (
//   <Dialog
//     open={isOpen}
//     onClose={onClose}
//     className="relative z-50"
//   >
//     <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30">
//       <DialogPanel className="max-w-xl min-w-96 bg-white rounded-lg p-3 shadow-lg">
//         <div className="flex justify-end ">
//           <button
//             onClick={onClose}
//             className="transition delay-50 duration-300 hover:rotate-90 hover:text-red-800"
//             >
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="px-4 pb-4 ">
//           <DialogTitle className="text-2xl font-bold flex justify-between gap-4 mb-3">{title || ""}{headerDetails}</DialogTitle>
//           {children}
//         </div>
//       </DialogPanel>
//     </div>
//   </Dialog>
// )
