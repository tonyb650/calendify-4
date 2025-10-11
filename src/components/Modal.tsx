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