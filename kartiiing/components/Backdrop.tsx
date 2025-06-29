import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Backdrop({ onClick = () => {}, children }: Props) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-[3px] z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
