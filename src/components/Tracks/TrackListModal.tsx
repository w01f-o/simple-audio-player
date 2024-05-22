import tracksStyles from "./tracks.module.scss";
import {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useRef,
} from "react";
import { Transition } from "react-transition-group";

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

interface Props {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TracksListModal: FC<Props> = ({ children, setIsOpen, isOpen }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <Transition
      in={isOpen}
      timeout={100}
      mountOnEnter
      unmountOnExit
      nodeRef={modalRef}
    >
      {(state) => (
        <div
          className={tracksStyles.modal}
          onClick={() => setIsOpen(false)}
          style={{
            transition: `opacity ${100}ms ease-in-out`,
            opacity: 0,
            // @ts-ignore
            ...transitionStyles[state],
          }}
          ref={modalRef}
        >
          <div
            className={tracksStyles.content}
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </Transition>
  );
};

export default TracksListModal;
