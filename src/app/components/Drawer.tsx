import { AnimatePresence, motion } from 'framer-motion'
import { type PropsWithChildren } from 'react'

import CloseButton from './CloseButton'

type DrawerProps = {
  id: string
  title: string
  isOpen: boolean
  onClose: () => void
}

const INITIAL_X = 500

export default function Drawer({
  id,
  title,
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DrawerProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ x: INITIAL_X }}
          animate={{ x: 0 }}
          transition={{
            type: 'linear',
            duration: 0.2,
          }}
          exit={{ x: INITIAL_X }}
          className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto bg-white w-[500px] shadow-md"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
        >
          <h3
            id={`${id}-label`}
            className="inline-flex items-center mb-4 text-lg font-bold text-gray-800"
          >
            {title}
          </h3>
          <CloseButton onClose={onClose} />
          <div className="text-sm py-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
